import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  box-sizing: border-box;
  background-color: #009933;
`;

const ButtonComponent: React.FC = () => {
  return <Button>Test button</Button>;
};

export default ButtonComponent;