/// <reference types="@emotion/react/types/css-prop" />

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    transitions?: {
      default: string;
      fast: string;
      slow: string;
    };
    typography?: {
      fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      fontWeights: {
        normal: number;
        medium: number;
        bold: number;
      };
    };
    zIndex?: {
      base: number;
      dropdown: number;
      header: number;
      overlay: number;
      modal: number;
    };
  }
}

declare module "@splidejs/react-splide" {
  import { ComponentType } from "react";
  export const Splide: ComponentType<any>;
  export const SplideSlide: ComponentType<any>;
}
