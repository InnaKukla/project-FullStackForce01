import React, { useEffect, useRef } from 'react';

import Icon from 'utils/Icon/Icon';
import { Backdrop, BtnContainer, CloseIcon, Container, Content } from './ModalUserStyled';

const Modal = ({ isOpen, onRequestClose, onApprove, children }) => {
  const modalRef = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onRequestClose();
    }
  };

  const handleBackdropClick = event => {
    if (modalRef.current === event.target) {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  return isOpen ? (
    <Backdrop ref={modalRef} onClick={handleBackdropClick}>
      <Container>
        <CloseIcon onClick={() => onRequestClose()}>
          <Icon name="cross" size="24" color="var(--dark-blue)" />
        </CloseIcon>

        <Content>{children}</Content>
        <BtnContainer></BtnContainer>
      </Container>
    </Backdrop>
  ) : null;
};

export default Modal;
