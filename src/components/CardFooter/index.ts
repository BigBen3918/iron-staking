import styled from 'styled-components';
import { FadeAnimated } from '../Form';

export const CardFooter = styled(FadeAnimated)<{ width?: string }>`
  color: #ddd;
  width: 100%;
  max-width: ${({ width }) => width || '200px'};
  font-size: 13px;
  padding-top: calc(16px);
  padding-bottom: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: rgb(195, 197, 203);
  background-color: #0c0f22;
  z-index: 1;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out 0s;
`;

export const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  color: #8f929a;
  /* font-size: 14px; */
  margin-top: 8px;
  padding-left: 20px;
  padding-right: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

export const CardFooterRowLeft = styled.div`
  display: flex;
  align-items: center;
  .value {
    color: ${({ theme }) => theme.color.white};
  }
`;

export const CardFooterRowRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  white-space: pre;
  color: ${({ theme }) => theme.color.white};
`;

export const CardFooterRowLink = styled.div`
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

export const CardFooterRowLinkHref = styled.a`
  color: #fea430;
  font-size: 14px;
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

export const CardText = styled.span<{ positive?: boolean }>`
  color: ${({ positive, theme }) => (positive ? theme.color.success : theme.color.danger)};
`;

export const CardUnit = styled.span`
  color: ${({ theme }) => theme.color.grey[500]};
  margin-left: 3px;
`;
