import Link from "next/link";
import styled from "@emotion/styled";

export default function Back() {
    return (
        <BackLink href="/">Back To Top</BackLink>
    );
}

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  text-decoration: none;
  padding-bottom: ${(props) => props.theme.spacing(8)};
  text-decoration:underline;
  &:hover {
     text-decoration:none;
  }

`;