import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

export type SwitcherProps = {
  className?: string;
  name?: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
};

const Switcher = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px;
  width: 36px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props): string =>
    props.isActive ? '#38B471' : '#A4A4A4'};
  transition: background-color 0.1s;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
`;

const SwitcherCircle = styled(motion.div)`
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
`;

const InputValue = styled.input`
  display: none;
`;

const ACTIVE_CIRCLE_POS_X = 16;

const SwitcherComponent: React.FC<SwitcherProps> = ({
  className,
  name,
  defaultValue = false,
  onChange,
}) => {
  const [isActive, setIsActive] = useState<boolean>(defaultValue);

  const resultClassName = className
    ? `ui-switcher ${className}`
    : 'ui-switcher';
  const switcherCirclePos = isActive ? ACTIVE_CIRCLE_POS_X : 0;

  const onSwitch = (): void => {
    setIsActive((prev) => {
      if (onChange) onChange(!prev);

      return !prev;
    });
  };

  return (
    <Switcher
      className={resultClassName}
      isActive={isActive}
      onClick={onSwitch}
    >
      <SwitcherCircle animate={{ x: switcherCirclePos }} />
      <InputValue readOnly name={name} value={isActive ? 'true' : 'false'} />
    </Switcher>
  );
};

export default SwitcherComponent;
