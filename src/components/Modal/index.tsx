import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import useOutsideClick from '../../hooks/useOutsideClick';
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
  z-index: 20;
  box-sizing: border-box;
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
  max-width: 100%;
  box-sizing: border-box;
`;

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
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
  exit: { top: '-50%', transition: { duration: '0.5', type: 'spring' } },
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  
    @media(min-width: 980px) {
      ${(): string => {
        return window.innerHeight < document.body.offsetHeight
          ? `padding-right: ${
              Number(
                window
                  .getComputedStyle(document.body)
                  .getPropertyValue('padding-right')
                  .slice(0, -2)
              ) + 17
            }px;`
          : '';
      }}
    }
  }
`;

const Modal: React.FC<ModalProps> = ({
  children,
  portalElement,
  hideCloseButton,
  isShow,
  disableOverlayClose,
  onClose,
  ...other
}) => {
  const containerRef = useRef(null);

  useOutsideClick(
    containerRef,
    () => {
      if (!disableOverlayClose) onClose();
    },
    [disableOverlayClose]
  );

  return createPortal(
    <AnimatePresence>
      {isShow && (
        <React.Fragment>
          <GlobalStyle />
          <Overlay
            initial='initial'
            animate='show'
            exit='exit'
            variants={overlayAnimation}
          >
            <Container
              ref={containerRef}
              onClick={(e): void => e.stopPropagation()}
              variants={modalAnimation}
              {...other}
            >
              {!hideCloseButton && <CloseButton onClick={onClose} />}
              <Body>{children}</Body>
            </Container>
          </Overlay>
        </React.Fragment>
      )}
    </AnimatePresence>,
    portalElement || document.body
  );
};

export default Modal;
