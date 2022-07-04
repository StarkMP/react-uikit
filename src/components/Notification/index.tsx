import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import CircleAlertIcon from '../Icons/CircleAlert';
import CircleCrossIcon from '../Icons/CircleCross';
import CircleTickIcon from '../Icons/CircleTick';
import CrossIcon from '../Icons/Cross';

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type NotificationProps = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  onRemove: () => void;
};

const TYPE_COLORS = {
  [NotificationType.Success]: '#B7F7D8',
  [NotificationType.Warning]: '#FBE7C6',
  [NotificationType.Error]: '#FFC2C1',
};

const TYPE_ICONS = {
  [NotificationType.Success]: <CircleTickIcon color='#000000' />,
  [NotificationType.Warning]: <CircleAlertIcon color='#000000' />,
  [NotificationType.Error]: <CircleCrossIcon color='#000000' />,
};

export const Wrapper = styled(motion.div)<{ type: NotificationType }>`
  display: flex;
  background: ${(props) => TYPE_COLORS[props.type]};
  border-radius: 13px;
  padding: 20px 78px;
  width: 450px;
  flex-direction: column;
  position: relative;
  max-width: 100%;

  @media (max-width: 520px) {
    padding: 15px 50px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 27px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 520px) {
    width: 20px;
    height: 20px;
    left: 15px;
  }
`;

const Title = styled.span`
  font-family: Gilroy;
  font-weight: bold;
  font-size: 20px;
  color: #1e1e1e;
  line-height: 24px;
  margin-bottom: 4px;

  @media (max-width: 520px) {
    line-height: unset;
    font-size: 16px;
  }
`;

const Description = styled.span`
  font-family: Gilroy;
  font-weight: 500;
  font-size: 14px;
  color: #1e1e1e;
  line-height: 16px;
`;

const CloseButton = styled(CrossIcon)`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  @media (max-width: 520px) {
    right: 18px;
    width: 20px;
    height: 20px;
  }
`;

const animations = {
  initial: { transform: 'translateX(480px)' },
  show: {
    transform: 'translateX(0px)',
    transition: { duration: '0.5', type: 'spring' },
  },
  exit: {
    transform: 'translateX(480px)',
    transition: { duration: '0.5', type: 'spring' },
  },
};

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  description,
  onRemove,
}) => {
  return (
    <Wrapper
      initial='initial'
      animate='show'
      exit='exit'
      variants={animations}
      type={type}
    >
      <IconWrapper>{TYPE_ICONS[type]}</IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CloseButton onClick={onRemove} />
    </Wrapper>
  );
};

export default Notification;
