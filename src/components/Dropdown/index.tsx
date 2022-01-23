import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import useOutsideClick from '../../hooks/useOutsideClick';

type DropdownPosAlignLeft = {
  top: number;
  left: number;
};

type DropdownPosAlignRight = {
  top: number;
  right: number;
};

type DropdownPosAlignCenter = {
  top: number;
  center: true;
};

type DropdownPos =
  | DropdownPosAlignLeft
  | DropdownPosAlignRight
  | DropdownPosAlignCenter;

export type DropdownProps = {
  triggerId: string;
  className?: string;
  topOffset?: number;
  align: 'left' | 'right' | 'center';
};

export const Dropdown = styled.div<DropdownPos>`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  ${(props) =>
    (props as DropdownPosAlignLeft).left !== undefined
      ? `left: ${(props as DropdownPosAlignLeft).left}px;`
      : ''}
  ${(props) =>
    (props as DropdownPosAlignRight).right !== undefined
      ? `right: ${(props as DropdownPosAlignRight).right}px;`
      : ''}
  ${(props) =>
    (props as DropdownPosAlignCenter).center
      ? 'left: 50%; transform: translateX(-50%);'
      : ''}
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
  align,
}) => {
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const ref = useRef(null);

  useOutsideClick(
    ref,
    (event) => {
      const mouseOverElement = document.elementFromPoint(
        event.clientX,
        event.clientY
      );

      if (mouseOverElement) {
        if (trigger && trigger.id === mouseOverElement.id) {
          return;
        }
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
      const top = trigger.offsetTop + trigger.clientHeight + topOffset;

      if (align === 'left') {
        return { top, left: trigger.offsetLeft };
      }

      if (align === 'right') {
        return { top, right: trigger.offsetLeft };
      }

      if (align === 'center') {
        return { top, center: true };
      }
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
