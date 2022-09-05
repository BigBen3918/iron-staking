/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

interface ModalsContext {
  content?: React.ReactNode;
  onPresent: (content: React.ReactNode, backdropClick?: boolean, id?: string) => string;
  onDismiss: (id: string) => void;
}

export const Context = createContext<ModalsContext>({
  onPresent: () => '',
  onDismiss: () => {},
});

interface ModalInfo {
  id: string;
  content?: React.ReactNode;
  backdropClick?: boolean;
}

const modalSetter =
  (info: ModalInfo) =>
  (state: ModalInfo[]): ModalInfo[] => {
    const existed = info.id && state.some((x) => x.id === info.id);
    if (!existed) {
      return [...state, info];
    }

    return state.map((item) => (item.id !== info.id ? item : info));
  };

const Modals: React.FC = ({ children }: any) => {
  const [modals, setModals] = useState<ModalInfo[]>([]);

  const handlePresent = useCallback(
    (modalContent: React.ReactNode, backdropClick?: boolean, id?: string) => {
      id = id || v4();
      setModals(modalSetter({ id, content: modalContent, backdropClick }));
      return id;
    },
    [],
  );

  const handleDismiss = useCallback((id: string) => {
    setModals((data: any) => data.filter((t: any) => t.id !== id));
  }, []);

  const backdropClick = useCallback(() => {
    if (modals.length === 0) {
      return;
    }
    setModals((data: any) => data.slice(0, data.length - 1));
  }, [modals]);

  return (
    <Context.Provider
      value={{
        content: modals,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {modals?.map((modal: any) => (
        <StyledModalWrapper key={modal.id}>
          <StyledBackdrop onClick={modal.backdropClick ? backdropClick : undefined} />
          <ModalContent>
            {React.isValidElement(modal.content) &&
              React.cloneElement(modal.content, {
                onDismiss: () => handleDismiss(modal.id),
              })}
          </ModalContent>
        </StyledModalWrapper>
      ))}
    </Context.Provider>
  );
};

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 20px 0;
  min-height: 100vh;
`;

const StyledBackdrop = styled.div`
  background-color: #222222;
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Modals;
