import React from 'react';
import styled from 'styled-components';

type ValidationErrorProps = {
  isVisible: boolean;
  label: string;
};

const Label = styled.div`
  box-sizing: border-box;
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ea526f;
  margin-top: 8px;
`;

const ValidationError: React.FC<ValidationErrorProps> = ({
  isVisible,
  label,
}) => {
  if (isVisible && label) {
    return <Label>{label}</Label>;
  }

  return null;
};

export default ValidationError;
