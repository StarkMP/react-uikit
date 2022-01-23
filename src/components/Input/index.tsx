import React, { useState } from 'react';
import styled from 'styled-components';

import { FormValidationRule } from '../Form/types';
import useFormValidation from '../Form/useFormValidation';
import ValidationError from '../Form/ValidationError';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> & {
  type?: 'email' | 'password';
  border?: boolean;
  label?: string;
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  validation?: FormValidationRule[];
};

type StyledComponentInputProps = InputProps & {
  error: boolean;
  withIcon: boolean;
  _size: 'md' | 'lg';
};

const Wrapper = styled.div<
  React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }
>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
  `}
`;

const Label = styled.label`
  box-sizing: border-box;
  color: #6d6d6d;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Input = styled.input<StyledComponentInputProps>`
  box-sizing: border-box;
  outline: none;
  border: none;
  width: 100%;
  padding: 0 20px;
  background: #ffffff;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  color: #1e1e1e;
  font-weight: 500;
  font-size: 14px;

  ${(props) =>
    props._size === 'md' &&
    `
    height: 48px;
  `}

  ${(props) =>
    props._size === 'lg' &&
    `
    height: 56px;
  `}

  ${(props) =>
    props.withIcon &&
    `
    padding-right: 64px;
  `}

  ${(props) =>
    props.border &&
    `
    border: 1px solid #DDDDDD;
  `}

  ${(props) =>
    props.error &&
    `
    border: 1px solid #D0091E !important;
  `}

  &::placeholder {
    color: #afafaf;
    font-weight: 400;
  }
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: auto;
    color: #afafaf;
  }
`;

const InputComponent: React.FC<InputProps> = ({
  name,
  className,
  label,
  size = 'lg',
  icon,
  disabled,
  validation,
  onChange,
  ...other
}) => {
  const [value, setValue] = useState<string>('');

  const resultClassName = className ? `ui-input ${className}` : 'ui-input';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    if (onChange) onChange(e);
  };

  const validationState = useFormValidation(name, validation, {
    onChange: handleChange,
  });

  return (
    <Wrapper disabled={disabled} className={resultClassName}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          name={name}
          _size={size}
          withIcon={Boolean(icon)}
          onChange={validationState ? validationState.onChange : handleChange}
          value={value}
          error={validationState ? validationState.error : false}
          {...other}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InputWrapper>
      {validationState && (
        <ValidationError
          isVisible={validationState.error}
          label={validationState.errorMessage}
        />
      )}
    </Wrapper>
  );
};

export default InputComponent;
