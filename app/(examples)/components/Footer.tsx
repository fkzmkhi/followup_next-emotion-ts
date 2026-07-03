"use client";

import React from "react";
import styled from "@emotion/styled";
import Back from "./Back";

export default function Footer() {
  return (
    <>
      <Back />
      <StyledFooter>
        <p>© 2024 Example Corporation. All rights reserved.</p>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled.footer`
  padding: ${props => props.theme.spacing(1)};
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;
