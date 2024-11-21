import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCookieValue = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.cookies[data];
  },
);
