import React, { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/web';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import TransactionPopup from './TransactionPopup';
import ErrorPopup from './ErrorPopup';

export const StyledClose = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  :hover {
    cursor: pointer;
  }
`;
export const Popup = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  position: relative;
  padding: 20px;
  padding-right: 35px;
  overflow: hidden;
  border-radius: 12px;
  background: rgb(33, 36, 41);
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;

  @media (max-width: 768px) {
    display: block;
    min-width: 290px;
  }
`;
const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.grey[400]};
`;

const AnimatedFader = animated(Fader);

interface PopupItemProps {
  removeAfterMs: number | null;
  content: PopupContent;
  popKey: string;
}

const PopupItem: React.FC<PopupItemProps> = ({ removeAfterMs, content, popKey }) => {
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);
  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);

  let popupContent;
  if ('txn' in content) {
    const {
      txn: { hash, success, summary },
    } = content;
    popupContent = <TransactionPopup hash={hash} success={success} summary={summary} />;
  }
  if ('error' in content) {
    const {
      error: { message, title },
    } = content;
    popupContent = <ErrorPopup message={message} title={title} />;
  }

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined },
  });

  return (
    <Popup>
      <StyledClose onClick={removeThisPopup}>
        <i className="fas fa-times"></i>
      </StyledClose>
      {popupContent}
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </Popup>
  );
};

export default PopupItem;
