"use client"

import styled from "@emotion/styled";
import { useState, useRef } from "react";
import type { MouseEvent } from "react";

interface SearchBarProps {
	query: string;
	onQueryChange: (value: string) => void;
	placeholder: string
}
export default function SearchBar({ query, onQueryChange, placeholder }: SearchBarProps) {
	return (
		<SearchBarContainer>
			<SearchBarWrapper>
				<SearchBarTitle>海外TV作品を検索</SearchBarTitle>
				<SearchInput type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder={placeholder} />
			</SearchBarWrapper>
		</SearchBarContainer>
	);
}
const SearchBarContainer = styled.div`
	padding:${(props) => props.theme.spacing(3)}
`;

const SearchBarWrapper = styled.div`
	width: 100%;
	max-width: 600px;
	margin: ${(props) => props.theme.spacing(4)} auto;
	background-color: ${(props) => props.theme.colors.surface};
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: ${(props) => props.theme.borderRadius.lg};
	padding: ${(props) => props.theme.spacing(4)};
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SearchBarTitle = styled.div`
	text-align: center;
	margin-top:0;
	margin-bottom: ${(props) => props.theme.spacing(2)};
	font-size: ${(props) => props.theme.typography.fontSizes.lg};
	font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

const SearchInput = styled.input`
width: 100%;
padding: 12px 16px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 8px;
outline: none;
  &:focus {
	border-color: #0070f3;
}
`;