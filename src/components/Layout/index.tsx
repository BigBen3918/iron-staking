import styled from 'styled-components';
import { BreakPoints, mediaQueries, AllBreakpoints } from 'src/theme';

type ColProps = Partial<Record<BreakPoints, number>>;

// const sizes: BreakPoints[] = ['sm', 'md', 'lg', 'xl'];

const generate = (props: ColProps) => {
  return AllBreakpoints.filter((size) => !!props[size]).map((size) => {
    const percent = (props[size] / 12) * 100 + '% !important;';
    return mediaQueries(size as BreakPoints)('width: ' + percent);
  });
};

export const Col = styled.div<ColProps>`
  width: 100%;
  ${(p) => {
    return generate(p);
  }}
`;

export const Row = styled.div<{ gutter?: string }>`
  display: flex;
  margin-left: -${(p) => p.gutter || '15px'};
  margin-right: -${(p) => p.gutter || '15px'};
  flex-wrap: wrap;

  ${Col} {
    padding: 0 ${(p) => p.gutter || '15px'};
  }
`;
