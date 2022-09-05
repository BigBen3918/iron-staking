import React from 'react';
import styled from 'styled-components';
import { DataRow, ExternalLink } from './types';

const DataBox: React.FC<{ rows: DataRow[]; link?: ExternalLink; width?: string }> = ({
  rows,
  link,
  width,
}) => {
  return (
    <StyledDataBox width={width}>
      {(rows || []).map((row, index) => (
        <StyledDataRow key={index}>
          <StyledDataRowLeft>{row.key}</StyledDataRowLeft>
          <StyledDataRowRight>{row.value}</StyledDataRowRight>
        </StyledDataRow>
      ))}
      {link && (
        <StyledDataRow>
          <StyledDataRowLink>
            <StyledDataRowLinkHref href={link.href} target="_blank" rel="noopener noreferrer">
              {link.text}
            </StyledDataRowLinkHref>
          </StyledDataRowLink>
        </StyledDataRow>
      )}
    </StyledDataBox>
  );
};

const StyledDataBox = styled.div<{ width: string }>`
  color: #ddd;
  width: 100%;
  max-width: ${({ width }) => width || '200px'};
  font-size: 0.9rem;
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: rgb(195, 197, 203);
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 0;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out 0s;
`;

const StyledDataRow = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: 8px;
  padding-left: 20px;
  padding-right: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

const StyledDataRowLeft = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`;

const StyledDataRowRight = styled.div`
  margin-left: auto;
  font-weight: 600;
`;

const StyledDataRowLink = styled.div`
  width: 100%;
  border: solid 1px rgba(255, 255, 255, 0.3);
  text-align: center;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  margin-top: 15px;
`;
const StyledDataRowLinkHref = styled.a`
  color: #fff;
  font-size: 0.8rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:after {
    content: '\f08e';
    font-family: 'Font Awesome 5 Pro';
    margin-left: 5px;
  }
`;

export default DataBox;
