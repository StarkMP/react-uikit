import React from 'react';
import styled from 'styled-components';

import Icons from '../Icons';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
  outlined?: boolean;
  borderless?: boolean;
  loading?: boolean;
};

const Button = styled.button<ButtonProps>`
  font-family: Gilroy, sans-serif;
  font-weight: 700;
  box-sizing: border-box;
  background: #ec546f;
  outline: none;
  color: #ffffff;
  border: none;
  transition: background 0.3s;
  text-align: center;
  position: relative;
  max-width: 100%;

  &:hover:not(:disabled) {
    cursor: pointer;
    background: #ce435d;
  }

  ${(props) =>
    props.size === 'sm' &&
    `
    height: 36px;
    border-radius: 8px;
    padding: 0 30px;
    font-size: 14px;
    line-height: 17px;
  `}

  ${(props) =>
    props.size === 'md' &&
    `
    height: 49px;
    border-radius: 10px;
    padding: 0 32px;
    font-size: 14px;
    line-height: 17px;
  `}

  ${(props) =>
    props.size === 'lg' &&
    `
    height: 62px;
    border-radius: 14px;
    padding: 0 48px;
    font-size: 18px;
    line-height: 23px;
  `}

  ${(props) =>
    props.outlined &&
    `
    background: none;
    border: 1px solid #dddddd;
    color: #1E1E1E;
    transition: border-color 0.3s, color 0.3s;

    &:hover:not(:disabled) {
      background: none;
      border-color: #ec546f;
      color: #ec546f;
    }
  `}

  ${(props) =>
    props.borderless &&
    `
    background: none;
    border: none;
    color: #1E1E1E;
    transition: color 0.3s;

    &:hover:not(:disabled) {
      background: none;
      color: #ec546f;
    }
  `}

  ${(props) =>
    props.loading &&
    `
    color: transparent;

    .ui-button__loader {
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
      height: 25px;

      ${
        props.size === 'lg'
          ? `
        width: 35px;
        height: 35px;
      `
          : ''
      }

      ${
        props.borderless || props.outlined
          ? `
        color: #1E1E1E;
      `
          : ''
      }
    }
  `}
`;

const ButtonComponent: React.FC<ButtonProps> = ({
  className,
  size = 'sm',
  children,
  disabled,
  loading,
  ...other
}) => {
  const resultClassName = className ? `ui-button ${className}` : 'ui-button';

  return (
    <Button
      className={resultClassName}
      size={size}
      disabled={disabled || loading}
      {...other}
    >
      {children}
      {loading && <Icons.Loader className='ui-button__loader' />}
    </Button>
  );
};

export default ButtonComponent;
