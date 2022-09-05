// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: number;
    color: {
      black: string;
      blue: Record<number, string>;
      grey: Record<number, string>;
      green: Record<number, string>;
      primary: {
        light: string;
        main: string;
      };
      secondary: string;
      white: string;
      orange: Record<number, string>;
      red: Record<number, string>;
      danger: string;
      success: string;
      bg: string;
    };
    siteWidth: number;
    spacing: Record<number, number>;
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    topBarSize: number;
    font: {
      monospace: string;
    };
  }
}
