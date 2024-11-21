import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AT_STRATEGY_KEY } from '../../common/constants';
import { JWTPayload, JWTPayloadCWithUserId } from '../types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, AT_STRATEGY_KEY) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('AT_JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayloadCWithUserId> {
    const { sub: userId, ...others } = payload;
    return { userId, ...others };
  }
}
