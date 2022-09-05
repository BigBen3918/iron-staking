import React, { useRef } from 'react';
import { useCallback, useContext } from 'react';
import { Context } from '../contexts/Modals';

const useModalWithFC = (id?: string) => {
  const { onDismiss, onPresent } = useContext(Context);
  const ref = useRef<string>(id);

  const handlePresent = useCallback(
    <T>(component: React.FC<T>, props?: T, backdropClick?: boolean) => {
      const el = React.createElement(component, props);
      ref.current = onPresent(el, backdropClick, id);
    },
    [id, onPresent],
  );

  const hideModal = useCallback(() => {
    onDismiss(ref.current);
  }, [onDismiss]);

  return { showModal: handlePresent, hideModal };
};

export default useModalWithFC;
