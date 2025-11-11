'use client';

import { Modal } from './Modal';
import { useModalQueueStore } from '@product-portal/shared-lib';

export function ModalQueue() {
  const { currentModal, showNext } = useModalQueueStore();

  const handleClose = () => {
    if (currentModal?.onClose) {
      currentModal.onClose();
    }
    showNext();
  };

  return (
    <Modal isOpen={currentModal !== null} onClose={handleClose} title={currentModal?.title}>
      {currentModal?.content}
    </Modal>
  );
}
