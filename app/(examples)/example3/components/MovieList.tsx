"use client"

import styled from "@emotion/styled";
import Image from "next/image";
import type { Movie } from "../api";

export default function MovieList({ results }: { results: Movie[] }) {
    return (
        <ListContainer>
            {results.length === 0 ? (
                <NoResults>作品が見つかりませんでした。</NoResults>
            ) : (
                <List>
                    {results.map((movie) => (
                        <li key={movie.id}>
                            <ItemLink href={movie.url} target="_blank" rel="noopener noreferrer">
                                <MovieImage
                                    src={movie.image}
                                    alt={movie.title}
                                    width={120}
                                    height={180}
                                />
                                <ItemBox>
                                    <Title>{movie.title}</Title>
                                    <Year>公開年: {movie.year}年</Year>
                                    <Summary>{movie.summary}</Summary>
                                </ItemBox>
                            </ItemLink>
                        </li>
                    ))}
                </List>
            )}
        </ListContainer>
    );
}

const ListContainer = styled.div`
  margin-top: ${props => props.theme.spacing(2)};
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(2)};
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const ItemLink = styled.a`
  display: flex;
  text-decoration: none;
  color: inherit;
  gap: ${props => props.theme.spacing(3)};
  padding: ${props => props.theme.spacing(2)};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 100%;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 4px 20px ${props => props.theme.colors.glow};
    
    h3 {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const MovieImage = styled(Image)`
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.sm};
  flex-shrink: 0;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(1)};
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin: 0;
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.default};
`;

const Year = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
`;

const Summary = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

const NoResults = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.md};
  margin-top: ${props => props.theme.spacing(4)};
`;