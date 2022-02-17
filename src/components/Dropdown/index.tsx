import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import useOutsideClick from '../../hooks/useOutsideClick';

type DropdownPos = {
  top: number;
  left: number;
};

export type DropdownProps = {
  triggerId: string;
  className?: string;
  topOffset?: number;
};

export const Dropdown = styled.div<DropdownPos>`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  ${(props) => (props.left !== undefined ? `left: ${props.left}px;` : '')}
  background: #ffffff;
  box-shadow: 2px 6px 56px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 18px;
  z-index: 30;
`;

const DropdownComponent: React.FC<DropdownProps> = ({
  children,
  triggerId,
  className,
  topOffset = 15,
}) => {
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const ref = useRef(null);

  useOutsideClick(
    ref,
    (event: MouseEvent) => {
      if (trigger && trigger.contains(event.target as HTMLElement)) {
        return;
      }

      setIsShow(false);
    },
    [trigger]
  );

  const resultClassName = className
    ? `ui-dropdown ${className}`
    : 'ui-dropdown';

  const onClick = () => {
    setIsShow((prev) => !prev);
  };

  const getPos = (): DropdownPos => {
    if (trigger) {
      return {
        top: trigger.offsetTop + trigger.clientHeight + topOffset,
        left: trigger.offsetLeft,
      };
    }

    return { top: 0, left: 0 };
  };

  useEffect(() => {
    setTrigger(document.getElementById(triggerId));
  }, [triggerId]);

  useEffect(() => {
    if (trigger) {
      trigger.addEventListener('click', onClick);

      return () => {
        trigger.removeEventListener('click', onClick);
      };
    }
  }, [trigger]);

  if (isShow) {
    return createPortal(
      <Dropdown ref={ref} className={resultClassName} {...getPos()}>
        {children}
      </Dropdown>,
      document.body
    );
  }

  return null;
};

export default DropdownComponent;
