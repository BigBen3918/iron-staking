import React from 'react';
import styled from 'styled-components';
import { useHideInfoBox, useIsHiddenInfoBox } from '../../state/application/hooks';
import CloseButton from '../CloseButton';
import { InfoBoxProps } from './types';
import InfoBoxBg from '../../assets/img/info-box-bg.jpg';
import { FadeAnimated } from '../Form';

const InfoBox: React.FC<InfoBoxProps> = ({
  boxKey,
  title,
  content,
  linkText,
  linkUrl,
  width,
  hideClose,
}) => {
  const hideInfoBox = useHideInfoBox();
  const isHidden = useIsHiddenInfoBox(boxKey);

  const hide = () => {
    hideInfoBox(boxKey);
  };

  return (
    !isHidden && (
      <StyledInfoBox width={width}>
        <StyledInfoBoxInner>
          <StyledInfoBoxContentWrapper>
            <StyledHeader>
              <StyledTitle>{title}</StyledTitle>
              {!hideClose && <CloseButton size="20px" onClick={hide} />}
            </StyledHeader>
            <StyledContent dangerouslySetInnerHTML={{ __html: content }}></StyledContent>
            {linkText && linkUrl && (
              <StyledLink href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkText}
              </StyledLink>
            )}
          </StyledInfoBoxContentWrapper>
        </StyledInfoBoxInner>
      </StyledInfoBox>
    )
  );
};

const StyledInfoBox = styled(FadeAnimated)<{ width?: string }>`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
  max-width: 640px;
  width: ${({ width }) => width || '100%'};
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledInfoBoxInner = styled.div`
  border-radius: 16px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-auto-rows: auto;
  padding: 0rem;
  z-index: 1;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.grey[850]};
  background-image: url(${InfoBoxBg});
  background-size: cover;
  background-position: center;
`;

const StyledInfoBoxContentWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 0.3rem;
  padding: 1rem;
  z-index: 1;
`;

const StyledHeader = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 0.85rem;
`;

const StyledTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 700;
  color: white;
  font-size: 1.25rem;
`;

const StyledContent = styled.div`
  font-size: 0.88rem;
`;
const StyledLink = styled.a`
  font-size: 0.88rem;
  color: ${(props) => props.theme.color.primary.main};
`;

export default InfoBox;
