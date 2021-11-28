import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Icons from '../Icons';

export type ModalProps = {
  portalElement?: HTMLElement;
  hideCloseButton?: boolean;
  disableOverlayClose?: boolean;
  isShow: boolean;
  onClose: () => void;
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Container = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 51px 45px;
  background: #ffffff;
  border-radius: 14px;
  position: relative;
`;

const Body = styled.div`
  display: flex;
`;

const CloseButton = styled(Icons.Cross)`
  opacity: 0.2;
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;

const overlayAnimation = {
  initial: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalAnimation = {
  initial: { top: '-50%' },
  show: { top: '50%', transition: { duration: '0.5', type: 'spring' } },
  exit: { top: '-50%' },
};

const Modal: React.FC<ModalProps> = ({
  children,
  portalElement,
  hideCloseButton,
  isShow,
  disableOverlayClose,
  onClose,
  ...other
}) => {
  if (!isShow) return null;

  return createPortal(
    <AnimatePresence>
      <Overlay
        initial={'initial'}
        animate={'show'}
        exit={'exit'}
        variants={overlayAnimation}
        onClick={disableOverlayClose ? () => void 0 : onClose}
      >
        <Container
          onClick={(e) => e.stopPropagation()}
          variants={modalAnimation}
          {...other}
        >
          {!hideCloseButton && <CloseButton onClick={onClose} />}
          <Body>{children}</Body>
        </Container>
      </Overlay>
    </AnimatePresence>,
    portalElement || document.body
  );
};

export default Modal;
