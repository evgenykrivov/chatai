import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AT_STRATEGY_KEY, IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class AtGuard extends AuthGuard(AT_STRATEGY_KEY) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
