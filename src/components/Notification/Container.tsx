import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Notification, {
  NotificationProps,
  Wrapper as NotificationWrapper,
} from '.';

type NotificationsContainerProps = {
  items: NotificationProps[];
};

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  padding: 30px;
  max-width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  ${NotificationWrapper} {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 520px) {
    padding: 20px;
  }
`;

const NotificationsContainer: React.FC<NotificationsContainerProps> = ({
  items,
}) =>
  createPortal(
    <Container>
      <AnimatePresence>
        {items.map((item) => (
          <Notification key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </Container>,
    document.body
  );

export default NotificationsContainer;
