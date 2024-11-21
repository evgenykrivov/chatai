import { TransformFnParams } from 'class-transformer';

enum EResultTypeString {
  upper = 'upperCase',
  lower = 'lowerCase',
  capitalize = 'capitalizeCase',
}

export function transformStringToAnotherCase(
  params: TransformFnParams,
  type: EResultTypeString = EResultTypeString.upper,
) {
  if (type === EResultTypeString.upper) {
    return params.value.toUpperCase();
  } else if (type === EResultTypeString.lower) {
    return params.value.toLowerCase();
  } else if (type === EResultTypeString.capitalize) {
    const { value } = params;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return params.value;
}
