import styled from "styled-components/native";
import { useWidth } from "verity-quik";

export const Body = styled.View<WidthProps>`
    width: 100%;
    flex: 1;
    flex-direction: ${({ $width }) =>
			useWidth($width, "column", "column", "column", "row", "row")};
    justify-content: space-between;
`;

export const MenuBox = styled.View<WidthProps>`
    width: ${({ $width }) =>
			useWidth($width, "100%", "100%", "100%", "69%", "74%")};
    flex: ${({ $width }) => useWidth($width, "1", "1", "1", "none", "none")};
`;

export const FormBox = styled.View<WidthProps>`
    width: ${({ $width }) =>
			useWidth($width, "100%", "100%", "100%", "28%", "25%")};
    padding: 10px;
`;

interface WidthProps {
	$width: number;
}
