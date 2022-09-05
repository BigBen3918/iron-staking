import React, { useState } from 'react';
import styled from 'styled-components';

export type PopoverPosition = 'top' | 'bottom' | 'right' | 'left';

interface PopoverProps {
  content: string | JSX.Element;
  position?: PopoverPosition;
}

const Popover: React.FC<PopoverProps> = ({ content, children, position }) => {
  const [isShow, setSisShow] = useState(false);

  const handleMouseIn = () => {
    setSisShow(true);
  };

  const handleMouseOut = () => {
    setSisShow(false);
  };

  return (
    <>
      <StyledToolTip onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut}>
        {isShow && position === 'top' && (
          <ToolTipTopContainer>
            <ToolTipContent>{<StyledContent>{content}</StyledContent>}</ToolTipContent>
            <ArrowDown />
          </ToolTipTopContainer>
        )}
        {isShow && position === 'bottom' && (
          <ToolTipBottomContainer>
            <ArrowUp />
            <ToolTipContent>
              <StyledContent>{content}</StyledContent>
            </ToolTipContent>
          </ToolTipBottomContainer>
        )}
        {isShow && position === 'left' && (
          <ToolTipLeftContainer>
            <ToolTipContent>
              <StyledContent>{content}</StyledContent>
            </ToolTipContent>
            <ArrowLeft />
          </ToolTipLeftContainer>
        )}
        {isShow && position === 'right' && (
          <ToolTipRightContainer>
            <ArrowRight />
            <ToolTipContent>
              <StyledContent>{content}</StyledContent>
            </ToolTipContent>
          </ToolTipRightContainer>
        )}
        <TooltipTrigger>{children}</TooltipTrigger>
      </StyledToolTip>
    </>
  );
};

Popover.defaultProps = {
  position: 'left',
};

const StyledToolTip = styled.div`
  position: relative;
  cursor: pointer;
  color: ${(props) => props.theme.color.secondary};
  &:hover {
    color: ${(props) => props.theme.color.white};
  }
`;

const TooltipTrigger = styled.div`
  display: block;
  padding: 3px;
  z-index: 10;
`;

const ToolTipContent = styled.div`
  background-color: #0a0c1b;
  position: relative;
  color: ${(props) => props.theme.color.grey[300]};
  border-radius: 8px;
  border-width: 0px;
  padding: 8px 10px;
  width: 240px;
  border: 1px solid #ffffff11;
  font-size: 14px;
  line-height: 1.5;
  z-index: 3;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 4px 8px,
    rgba(0, 0, 0, 0.2) 0px 16px 16px, rgba(0, 0, 0, 0.2) 0px 14px 14px;
`;

const StyledContent = styled.p`
  overflow: hidden;
  display: -webkit-box;
  padding: 0;
  margin: 0;
`;

// TOP

const ToolTipTopContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #36383b;
  align-self: center;
  filter: drop-shadow(0px 2px 0px #434750);
  transform: scale(0.5) translateY(-2px);
  transform-origin: top;
`;

// BOTTOM

const ToolTipBottomContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #36383b;
  align-self: center;
  filter: drop-shadow(0px -2px 0px #434750);
  transform: scale(0.5) translateY(2px);
  transform-origin: bottom;
`;

//LEFT

const ToolTipLeftContainer = styled.div`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: row;
  z-index: 1000;
`;

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #36383b;
  align-self: center;
  filter: drop-shadow(2px 0px 0px #434750);
  transform: scale(0.5) translateX(-2px);
  transform-origin: left;
`;

//RIGHT

const ToolTipRightContainer = styled.div`
  position: absolute;
  left: 10px;
  top: -2px;
  display: flex;
  flex-direction: row;
  z-index: 1000;
  cursor: text;
`;

const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid #0a0c1b;
  filter: drop-shadow(-2px 10px 4px 2px #0a0c1b);
  transform: scale(0.5) translateX(2px);
  transform-origin: right;
`;

export default Popover;
