export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;

    return 'required';
}

export const maxLength = (maxLength: number): FieldValidatorType => (value: string) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols.`;

  return undefined;
}

export const minLength = (minLength: number): FieldValidatorType => (value: string) => {
    if (value.length < minLength) return `Min length is ${minLength} symbols.`;

    return undefined;
}