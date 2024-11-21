import { CookieOptions } from 'express';
import { RT_EXPIRES_IN_SECONDS } from './jwt.config';

export const refreshTokenConfigOptions: CookieOptions = {
  httpOnly: true,
  maxAge: RT_EXPIRES_IN_SECONDS * 1000, // sec to ms
  sameSite: 'strict',
  secure: false,
};
