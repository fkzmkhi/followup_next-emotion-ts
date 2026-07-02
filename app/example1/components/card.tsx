"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { CardItem as CardItemType } from "@/app/example1/util/data";

export default function CardItem({ src, title, description, link }: CardItemType) {
    return (
        <CardItemWrapper>
            <CardImage
                src={src}
                alt={title}
                width={600}
                height={400}
            />
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardLink href={link || "/"}>Read More</CardLink>
            </CardBody>
        </CardItemWrapper>
    );
}

const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors?.surface || "#1E2128"};
  border-radius: ${props => props.theme.borderRadius?.lg || "12px"};
  border: 1px solid ${props => props.theme.colors?.border || "rgba(169,171,179,0.2)"};
  overflow: hidden;
  height: 100%; /* 全体の高さを統一するため */
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1; /* 残りの高さをすべて占めてフッター要素を下に押し下げるため */
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography?.fontSizes?.md || "1.125rem"};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || 700};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography?.fontSizes?.sm || "0.875rem"};
  color: ${props => props.theme.colors?.textMuted || "#A9ABB3"};
  margin: 0;
  line-height: 1.5;
  flex: 1; /* 説明文の長さに関わらずリンクボタンの位置を下に揃えるため */
`;

const CardLink = styled(Link)`
  align-self: flex-start;
  color: ${props => props.theme.colors?.secondary || "#899DFA"};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || "0.875rem"};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || 500};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;