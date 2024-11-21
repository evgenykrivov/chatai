import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { TAccessToken } from './types';
import { Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { Response } from 'express';
import {
  AT_STRATEGY_KEY,
  FINGERPRINT_KEY,
  RT_STRATEGY_KEY,
} from '../common/constants';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { Fingerprint, IFingerprint } from 'nestjs-fingerprint';
import { GetCookieValue } from '../common/decorators/get-cookie.decorator';
import { refreshTokenConfigOptions } from '../config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
    @Fingerprint() fp: IFingerprint,
  ): Promise<TAccessToken> {
    const { access_token, refresh_token } = await this.authService.signUp(
      dto,
      fp,
    );
    response.cookie(RT_STRATEGY_KEY, refresh_token, refreshTokenConfigOptions);
    return { access_token };
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) response: Response,
    @Fingerprint() fp: IFingerprint,
  ): Promise<TAccessToken> {
    const { access_token, refresh_token } = await this.authService.signIn(
      dto,
      fp,
    );
    response.cookie(RT_STRATEGY_KEY, refresh_token, refreshTokenConfigOptions);
    return { access_token };
  }

  @ApiBearerAuth(AT_STRATEGY_KEY)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @GetCookieValue(RT_STRATEGY_KEY) refreshToken: string,
    @Res({ passthrough: true }) response: Response,
    @Fingerprint() fp: IFingerprint,
  ) {
    await this.authService.logout(refreshToken, fp);

    const cookiesToRemove = [RT_STRATEGY_KEY, FINGERPRINT_KEY];
    cookiesToRemove.forEach(cookie => {
      response.clearCookie(cookie, {
        httpOnly: true,
      });
    });
  }

  @ApiCookieAuth(`Cookie ${RT_STRATEGY_KEY}`)
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCookieValue(RT_STRATEGY_KEY) refreshToken: string,
    @Fingerprint() fp: IFingerprint,
    @Res({ passthrough: true }) response: Response,
    // @GetCurrentUser('userId') userId: number,
  ): Promise<TAccessToken> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(refreshToken, fp);
    response.cookie(RT_STRATEGY_KEY, refresh_token, refreshTokenConfigOptions);
    return { access_token };
  }
}
