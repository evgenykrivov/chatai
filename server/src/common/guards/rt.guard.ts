import { AuthGuard } from '@nestjs/passport';
import { RT_STRATEGY_KEY } from '../constants';

export class RtGuard extends AuthGuard(RT_STRATEGY_KEY) {
  constructor() {
    super();
  }
}
