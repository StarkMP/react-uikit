import { FormEvent as ReactFormEvent, FormHTMLAttributes } from 'react';

export type FormValues = Record<string, string>;

export type FormEvent = ReactFormEvent<HTMLFormElement>;

export type FormSubmitArguments = {
  values: FormValues;
  formData: FormData;
};

export type FormValidationFailedArguments = {
  values: FormValues;
  validation: FormValidationStatus;
};

export type FormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  onSubmit: (data: FormSubmitArguments) => void;
  onValidationFailed?: (data: FormValidationFailedArguments) => void;
};

export type FormContextProps = {
  validationStatus: FormValidationStatus;
  mountValidationRules: (
    formElementName: string,
    rules: FormValidationRule[]
  ) => void;
};

export enum ValidationRule {
  Required = 'required',
  Match = 'match',
  NotMatch = 'not_match',
  MinLength = 'min_length',
  MaxLength = 'max_length',
  RegExp = 'regexp',
  Custom = 'custom',
}

export type FormValidationRule<T = string> =
  | FormValidationRuleRequired
  | FormValidationRuleMatch
  | FormValidationRuleNotMatch
  | FormValidationRuleMinLength
  | FormValidationRuleMaxLength
  | FormValidationRuleRegExp
  | FormValidationRuleCustom<T>;

export type FormValidationRuleRequired = {
  rule: ValidationRule.Required;
  message: string;
};

export type FormValidationRuleMatch = {
  rule: ValidationRule.Match;
  message: string;
  value: string;
};

export type FormValidationRuleNotMatch = {
  rule: ValidationRule.NotMatch;
  message: string;
  value: string;
};

export type FormValidationRuleMinLength = {
  rule: ValidationRule.MinLength;
  message: string;
  value: number;
};

export type FormValidationRuleMaxLength = {
  rule: ValidationRule.MaxLength;
  message: string;
  value: number;
};

export type FormValidationRuleRegExp = {
  rule: ValidationRule.RegExp;
  message: string;
  value: RegExp;
};

export type FormValidationRuleCustomCallback<T> = (fieldValue: T) => boolean;

export type FormValidationRuleCustom<T> = {
  rule: ValidationRule.Custom | string;
  message: string;
  value: FormValidationRuleCustomCallback<T>;
};

export type FormValidation = {
  [formElementName: string]: FormValidationRule[];
};

export type FormValidationStatus = Record<
  string,
  Record<ValidationRule, boolean>
>;
