import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useOutsideClick from '../../hooks/useOutsideClick';
import { FormValidationRule } from '../Form/types';
import useFormValidation from '../Form/useFormValidation';
import ValidationError from '../Form/ValidationError';
import Icons from '../Icons';

type Option = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  className?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  options: Option[];
  validation?: FormValidationRule[];
  label?: string;
  onChange?: (value: string) => void;
};

const Select = styled.div`
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  box-sizing: border-box;
  color: #6d6d6d;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Button = styled.button<{ error?: boolean }>`
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding: 0 16px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 56px;
  z-index: 9;
  position: relative;

  ${(props) =>
    props.error &&
    `
    border: 1px solid #D0091E !important;
  `}
`;

const Value = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  color: #1e1e1e;
`;

const SelectArrowIcon = styled(Icons.SelectArrow)<{ isOpen: boolean }>`
  width: 14px;
  height: 8px;
  position: absolute;
  top: 50%;
  right: 17px;
  color: #6d6d6d;
  transform: translateY(-50%) rotate(${(props) => (props.isOpen ? 180 : 0)}deg);
`;

const List = styled.ul<{ topIndent: boolean }>`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 34px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow-x: hidden;
  max-height: 200px;
  z-index: 9;
  margin: 0;
  padding: 0;
  top: 100%;

  ${(props) => (props.topIndent ? 'top: calc(100% - 23px);' : '')}}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 12px 16px;
  transition: background 0.1s;
  cursor: pointer;
  z-index: 8;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    background: #f7f7f7;
  }
`;

const OptionLabel = styled.span<{ disabled?: boolean }>`
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.disabled ? '#c5c5c5' : '#1e1e1e')};
`;

const OptionIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const TickIcon = styled(Icons.Tick)`
  position: absolute;
  width: 12px;
  height: 9px;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
  color: #1e1e1e;
`;

const InputValue = styled.input`
  display: none;
`;

const SelectComponent: React.FC<SelectProps> = ({
  className,
  placeholder = '',
  defaultValue = '',
  name,
  options,
  validation,
  label,
  onChange,
  ...other
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const elementRef = useRef(null);

  const resultClassName = className ? `ui-select ${className}` : 'ui-select';

  const findOptionByValue = (optionValue: string) =>
    options.find((option) => option.value === optionValue);

  const activeOption = useMemo(
    () => findOptionByValue(value),
    [value, options]
  );

  const currentLabel = useMemo(() => {
    if (!value && placeholder) {
      return placeholder;
    }

    if (activeOption) {
      return activeOption.label;
    }

    return '';
  }, [value, placeholder, options, activeOption]);

  const onSelectOption = (optionValue: string) => {
    if (findOptionByValue(optionValue)?.disabled) {
      return;
    }

    setValue(optionValue);
    setIsOpen(false);

    if (onChange) onChange(optionValue);
  };

  useOutsideClick(elementRef, () => {
    setIsOpen(false);
  });

  const validationState = useFormValidation(name, validation, {
    onChange: onSelectOption,
  });

  return (
    <Select ref={elementRef} className={resultClassName} {...other}>
      {label && <Label>{label}</Label>}
      <Button
        className='ui-select__btn'
        type='button'
        error={validationState ? validationState.error : false}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {activeOption && activeOption.icon && (
          <OptionIcon className='ui-select__icon'>
            {activeOption.icon}
          </OptionIcon>
        )}
        <Value className='ui-select__value'>{currentLabel}</Value>
        <SelectArrowIcon className='ui-select__arrow' isOpen={isOpen} />
      </Button>
      {isOpen && (
        <List
          topIndent={validationState !== null && validationState.error}
          className='ui-select__list'
        >
          {options.map((data) => (
            <Option
              className='ui-select__option'
              onClick={() =>
                validationState
                  ? validationState.onChange(data.value)
                  : onSelectOption(data.value)
              }
              key={data.value}
            >
              {data.icon && <OptionIcon>{data.icon}</OptionIcon>}
              <OptionLabel disabled={data.disabled}>{data.label}</OptionLabel>
              {value === data.value && <TickIcon />}
            </Option>
          ))}
        </List>
      )}
      <InputValue readOnly name={name} value={value} />
      {validationState && (
        <ValidationError
          isVisible={validationState.error}
          label={validationState.errorMessage}
        />
      )}
    </Select>
  );
};

export default SelectComponent;
