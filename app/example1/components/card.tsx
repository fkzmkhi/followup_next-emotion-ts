"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { CardItem as CardItemType } from "@/app/example1/util/data";

export default function CardItem({ src, title, description, link }: CardItemType) {
	return (
		<CardItemWrapper>
			<CardImageFrame>
				<CardImage
					src={src}
					alt={title}
					width={600}
					height={400}
				/>
			</CardImageFrame>
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardLink href={link || "/"}>Read More</CardLink>
			</CardBody>
		</CardItemWrapper>
	);
}

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${props => props.theme.transitions.default};
`;

const CardImageFrame = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const CardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1; 
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.md};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
  flex: 1; 
`;

const CardLink = styled(Link)`
  align-self: flex-start;
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  height: 100%; 

  &:has(${CardLink}:hover) ${CardImage} {
    transform: scale(1.05);
  }
`;