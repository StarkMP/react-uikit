import {
  FormValidationRule,
  FormValidationRuleRequired,
  ValidationRule,
} from './types';

export const validate = (rules: FormValidationRule[], value: string) => {
  let trimmedValue = value;

  if (typeof value === 'string') {
    trimmedValue = value.trim();
  }

  return rules.reduce(
    (memo: Record<string, boolean>, val: FormValidationRule) => {
      // Rules without value
      const ruleName = val.rule;

      if (ruleName === ValidationRule.Required) {
        memo[ruleName] = Boolean(trimmedValue);

        return memo;
      }

      // Rules with value
      const validationValue = (
        val as Exclude<FormValidationRule, FormValidationRuleRequired>
      ).value;

      if (validationValue === undefined) {
        return memo;
      }

      if (
        ruleName.includes(ValidationRule.Custom) &&
        typeof validationValue === 'function'
      ) {
        memo[ruleName] = validationValue(trimmedValue);

        return memo;
      }

      // Rules for string fields
      if (typeof trimmedValue !== 'string') {
        return memo;
      }

      if (ruleName === ValidationRule.Match) {
        memo[ruleName] = trimmedValue === validationValue;

        return memo;
      }

      if (ruleName === ValidationRule.NotMatch) {
        memo[ruleName] = trimmedValue !== validationValue;

        return memo;
      }

      if (ruleName === ValidationRule.MinLength) {
        memo[ruleName] = trimmedValue.length >= validationValue;

        return memo;
      }

      if (ruleName === ValidationRule.MaxLength) {
        memo[ruleName] = trimmedValue.length <= validationValue;

        return memo;
      }

      if (
        ruleName === ValidationRule.RegExp &&
        validationValue instanceof RegExp
      ) {
        memo[ruleName] = validationValue.test(trimmedValue);

        return memo;
      }

      return memo;
    },
    {}
  );
};
