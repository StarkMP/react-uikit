import React, { createContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { isEmpty } from '../../utils/methods';
import {
  FormContextProps,
  FormEvent,
  FormProps,
  FormValidation,
  FormValidationRule,
  FormValidationStatus,
  FormValues,
  ValidationRule,
} from './types';
import { validate } from './utils';

export const FormContext = createContext<FormContextProps>({
  validationStatus: {},
  mountValidationRules: () => {},
});

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100%;
`;

const FormComponent: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
  onValidationFailed,
  ...other
}) => {
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [rules, setRules] = useState<FormValidation>({});
  const [validationStatus, setValidationStatus] =
    useState<FormValidationStatus>({});

  const values: FormValues = useMemo(() => {
    const formValues: FormValues = {};

    // todo: add support to Files
    for (const pair of formData.entries() as IterableIterator<
      [string, string]
    >) {
      formValues[pair[0]] = pair[1];
    }

    return formValues;
  }, [formData]);

  const mountValidationRules = (
    formElementName: string,
    rules: FormValidationRule[]
  ): void => {
    setRules((prev) => ({ ...prev, [formElementName]: rules }));
  };

  const isValid = (): boolean => {
    if (isEmpty(validationStatus) || isEmpty(rules)) {
      return true;
    }

    return (
      Object.keys(validationStatus).findIndex(
        (formElementName) =>
          (
            Object.keys(validationStatus[formElementName]) as ValidationRule[]
          ).findIndex((rule) => !validationStatus[formElementName][rule]) !== -1
      ) === -1
    );
  };

  const getValidationStatus = (): FormValidationStatus => {
    if (!isEmpty(rules) && !isEmpty(values)) {
      const validationResult: FormValidationStatus = {};

      Object.keys(rules).forEach((name) => {
        validationResult[name] = validate(rules[name], values[name]);
      });

      return validationResult;
    }

    return {};
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setFormData(formData);
  };

  const afterValidate = (): void => {
    if (isEmpty(values)) {
      return;
    }

    if (!isValid()) {
      if (onValidationFailed)
        onValidationFailed({ values, validation: validationStatus });

      return;
    }

    if (onSubmit) onSubmit({ values, formData });
  };

  useEffect(() => {
    setValidationStatus(getValidationStatus());
  }, [values]);

  useEffect(() => {
    afterValidate();
  }, [validationStatus]);

  const resultClassName = className ? `ui-form ${className}` : 'ui-form';

  return (
    <FormContext.Provider value={{ validationStatus, mountValidationRules }}>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={resultClassName}
        {...other}
      >
        {children}
      </Form>
    </FormContext.Provider>
  );
};

export default FormComponent;
