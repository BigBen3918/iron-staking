import { AllBreakpoints, mediaQueries } from 'src/theme';
import { createGlobalStyle } from 'styled-components';

type DiplayTypes = 'inline' | 'block' | 'inline-block' | 'none';
const displayTypes: DiplayTypes[] = ['inline', 'block', 'inline-block', 'none'];

const display = () => {
  const media = AllBreakpoints.slice(1)
    .map((size) => {
      const css = displayTypes
        .map((d) => {
          return `.d-${size}-${d} { display : ${d} !important;}`;
        })
        .join('\n');
      return mediaQueries(size)(css);
    })
    .join('\n');

  const xs = displayTypes.map((d) => `.d-${d} { display: ${d} !important; }`).join('\n');
  return xs + '\n' + media;
};

export const GlobalStyle = createGlobalStyle`
 ${display()}
`;
