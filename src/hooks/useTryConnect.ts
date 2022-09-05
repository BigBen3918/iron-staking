import { useCallback } from 'react';
import useModalWithFC from './useModalWithFC';
import SelectWalletModal from 'src/components/SelectWalletModal';

const useTryConnect = () => {
  const { showModal, hideModal } = useModalWithFC();
  const tryConnect = useCallback(async () => {
    showModal(SelectWalletModal, {
      onDismiss: hideModal,
    });
  }, [hideModal, showModal]);

  return {
    tryConnect,
  };
};

export default useTryConnect;
