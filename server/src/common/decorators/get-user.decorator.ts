import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayloadKeys } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
  (
    data: JWTPayloadKeys | JWTPayloadKeys[] | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (typeof data === 'string') {
      return request.user[data];
    } else if (Array.isArray(data)) {
      const result: Record<string, any> = {};
      for (const el of data) {
        result[el] = request.user[el];
      }
      return result;
    }
    return request.user;
  },
);
