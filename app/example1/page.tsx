"use client";

import React from "react";
import { css, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "./components/header";
import Mv from "./components/mv";
import Features from "./components/features";
import Footer from "./components/footer";

export default function Example1Page() {
  interface AppTheme {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      background: string;
      surface: string;
      border: string;
      text: string;
      textMuted: string;
      success: string;
      error: string;
      glow: string;
    },
    transitions: {
      default: string;
      fast: string;
      slow: string;
    },
    borderRadius: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    },
    spacing: (factor: number) => string;
    typography: {
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
    zIndex: {
      base: number;
      dropdown: number;
      header: number;
      overlay: number;
      modal: number;
    };
  }
  const currentTheme: AppTheme = {
    colors: {
      primary: "#5A6BEA",
      primaryHover: "#4A5BCD",
      secondary: "#899DFA",
      text: "#F5F5F7",
      textMuted: "#A9ABB3",
      background: "#e7e7e7",
      surface: "#1E2128",
      border: "rgba(169,171,179,0.2)",
      success: "#10B981",
      error: "#EF4444",
      glow: "rgba(90, 107, 234, 0.4)",
    },
    transitions: {
      default: "all 0.2s ease-in-out",
      fast: "all 0.1s ease",
      slow: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    },
    borderRadius: {
      none: "0px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px"
    },
    spacing: (factor) => `${factor * 8}px`,
    typography: {
      fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
      },
      fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
      }
    },
    zIndex: {
      base: 0,
      dropdown: 100,
      header: 500,
      overlay: 1000,
      modal: 1100,
    }
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <PageWrapper>
        <Header />
        <main>
          <Mv />
          <Features />
        </main>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding-top: 74px; /* Headerの高さ分空ける */
  }
  main {
    flex: 1;
  }
  
`;

