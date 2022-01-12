import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { FormContext } from '.';
import { FormValidationRule, ValidationRule } from './types';

type UseFormValidationAdditionalData = {
  onChange?: (...args: any[]) => void;
};

const useFormValidation = (
  name?: string,
  validation?: FormValidationRule[],
  data: UseFormValidationAdditionalData = {}
) => {
  if (!name || !validation) {
    return null;
  }

  const { onChange } = data;

  const { validationStatus, mountValidationRules } = useContext(FormContext);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const rules = useMemo(
    () =>
      validation.map((rule, index) => {
        if (rule.rule === ValidationRule.Custom) {
          return { ...rule, rule: `custom_${index}` };
        }

        return rule;
      }),
    [validation]
  );

  const checkValidation = () => {
    const status = validationStatus[name];

    if (status) {
      const invalidRuleName = (Object.keys(status) as ValidationRule[]).find(
        (rule) => !status[rule]
      );

      const invalidRule = rules.find((rule) => rule.rule === invalidRuleName);

      if (invalidRule) {
        setError(true);

        const validationErrorMessage = invalidRule.message;

        if (validationErrorMessage) {
          setErrorMessage(validationErrorMessage);
        }
      }
    }
  };

  const handleChange = useCallback(
    (...args) => {
      setError(false);
      setErrorMessage('');

      if (onChange) onChange.apply(this, args);
    },
    [onChange]
  );

  useEffect(() => {
    checkValidation();
  }, [validationStatus]);

  useEffect(() => {
    mountValidationRules(name, rules);
  }, []);

  return { error, errorMessage, onChange: handleChange };
};

export default useFormValidation;
