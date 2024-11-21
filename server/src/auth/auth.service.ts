import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { JWTPayload, ITokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IFingerprint } from 'nestjs-fingerprint';
import { AT_EXPIRES_TIME_JWT, RT_EXPIRES_IN_SECONDS } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: SignUpDto, fp: IFingerprint): Promise<ITokens> {
    try {
      const user = await this.findUserByEmail(dto.email);

      if (user) {
        return Promise.reject(
          new ConflictException('User with such email already exists'),
        );
      }

      const hashedPassword = await this.hashData(dto.password);

      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          role: dto.role,
        },
      });

      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.role,
      );
      await this.createRefreshSession(newUser.id, tokens.refresh_token, fp);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto, fp: IFingerprint): Promise<ITokens> {
    const user = await this.findUserByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await argon2.verify(user.password, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.createRefreshSession(user.id, tokens.refresh_token, fp);
    return tokens;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async logout(refresh_token: string, fp: IFingerprint) {
    await this.prisma.refreshSession.deleteMany({
      where: {
        refresh_token,
        fingerprint: {
          equals: fp.id,
        },
      },
    });
  }

  async refreshTokens(refresh_token: string, fp: IFingerprint) {
    if (!refresh_token) {
      throw new UnauthorizedException();
    }

    const currentSession = await this.prisma.refreshSession.findFirst({
      where: {
        refresh_token,
      },
    });

    if (!currentSession) {
      throw new UnauthorizedException();
    }

    if (currentSession.fingerprint !== fp.id) {
      throw new ForbiddenException('Access Denied');
    }

    await this.prisma.refreshSession.deleteMany({
      where: {
        refresh_token,
      },
    });

    const refreshTokenMatches = currentSession.refresh_token === refresh_token;

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: currentSession.userId,
      },
    });

    const tokens = await this.getTokens(user.id, user.email, user.role);

    await this.createRefreshSession(user.id, tokens.refresh_token, fp);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async createRefreshSession(
    userId: number,
    refresh_token: string,
    fingerprint: IFingerprint,
  ) {
    await this.prisma.refreshSession.create({
      data: {
        userId,
        refresh_token,
        fingerprint: fingerprint.id,
      },
    });
  }

  async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<ITokens> {
    const payload: JWTPayload = {
      sub: userId,
      email,
      role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('AT_JWT_SECRET'),
        expiresIn: AT_EXPIRES_TIME_JWT,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('RT_JWT_SECRET'),
        expiresIn: RT_EXPIRES_IN_SECONDS,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
