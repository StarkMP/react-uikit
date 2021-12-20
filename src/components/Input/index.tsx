import React, { useState } from 'react';
import styled from 'styled-components';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> & {
  type?: 'email' | 'password';
  border?: boolean;
  label?: string;
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  error?: boolean;
  errorText?: string;
};

type StyledComponentInputProps = InputProps & {
  withIcon: boolean;
  _size: 'md' | 'lg';
};

const Wrapper = styled.div<
  React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }
>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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
    border: 1px solid #D0091E;
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

const ErrorText = styled.div`
  box-sizing: border-box;
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ea526f;
  margin-top: 8px;
`;

const InputComponent: React.FC<InputProps> = ({
  className,
  label,
  size = 'lg',
  icon,
  errorText,
  disabled,
  onChange,
  ...other
}) => {
  const [value, setValue] = useState<string>('');

  const resultClassName = className ? `ui-input ${className}` : 'ui-input';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    if (onChange) onChange(e);
  };

  return (
    <Wrapper disabled={disabled} className={resultClassName}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          _size={size}
          withIcon={Boolean(icon)}
          onChange={handleChange}
          value={value}
          {...other}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InputWrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Wrapper>
  );
};

export default InputComponent;