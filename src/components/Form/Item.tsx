import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { FormContext } from '.';
import { FormItemProps, ValidationRule } from './types';

const FormItem: React.FC<FormItemProps> = ({
  component,
  validation,
  name,
  onChange,
  ...other
}) => {
  const { validationStatus, mountValidationRules } = useContext(FormContext);
  const [error, setError] = useState<string>();

  const Component = component;

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

      if (invalidRule && invalidRule.message) {
        setError(invalidRule.message);
      }
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');

      if (onChange) onChange(e);
    },
    [onChange]
  );

  useEffect(() => {
    checkValidation();
  }, [validationStatus]);

  useEffect(() => {
    mountValidationRules(name, rules);
  }, []);

  return (
    <Component
      {...other}
      onChange={handleChange}
      name={name}
      error={!!error}
      errorText={error}
    />
  );
};

export default FormItem;
