import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RT_STRATEGY_KEY } from '../../common/constants';
import { JWTPayload, JWTPayloadCWithUserId } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, RT_STRATEGY_KEY) {
  constructor(config: ConfigService) {
    super({
      // For headers
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: config.get('RT_JWT_SECRET'),
      // passReqToCallback: true,

      // For cookies
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: config.get('RT_JWT_SECRET'),
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies[RT_STRATEGY_KEY]) {
      return req.cookies[RT_STRATEGY_KEY];
    }
    return null;
  }

  async validate(payload: JWTPayload): Promise<JWTPayloadCWithUserId> {
    const { sub: userId, ...others } = payload;
    return { userId, ...others };
  }

  // For headers
  // validate(req: Request, payload: any) {
  //   const [type, token] = req.get('authorization')?.split(' ') ?? [];
  //   const refreshToken = type === 'Bearer' ? token : undefined;
  //   return {
  //     ...payload,
  //     refreshToken,
  //   };
  // }
}
