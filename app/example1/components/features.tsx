"use client";

import React from "react";
import styled from "@emotion/styled";
import CardItem from "./card"
import { DUMMY_CARD_ITEMS } from "../util/data"

export default function Features() {
  return (
    <StyledFeature>
      <SectionTitle>Features</SectionTitle>
      <CardGrid>
        {DUMMY_CARD_ITEMS.map((item) => (
          <CardItem
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </CardGrid>
    </StyledFeature>
  );
}

const StyledFeature = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: ${props => props.theme.typography?.fontSizes?.lg || "1.75rem"};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || 700};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  /* レスポンシブ対応：タブレットでは2カラム、スマホでは1カラムにするのが実務の定石です */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
