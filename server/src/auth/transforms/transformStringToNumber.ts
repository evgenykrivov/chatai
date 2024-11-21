import { TransformFnParams } from 'class-transformer';

export function TransformStringToNumber(params: TransformFnParams) {
  if (params.value !== undefined) {
    return parseInt(params.value, 10);
  }
  return params.value;
}
