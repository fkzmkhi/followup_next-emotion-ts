"use client";

import React from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { currentTheme } from "@/app/example-theme";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={currentTheme}>
      <PageWrapper>
        <Header />
        <main>{children}</main>
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

  }
`;
