import styled from "styled-components/native";
import { useWidth } from "verity-quik";

interface BoxInterface {
	$width: number;
}

export const Body = styled.View<BoxInterface>`
	width: 100%;
    flex: 1;
    background-color: purple;
	justify-content: ${({ $width }) =>
		useWidth(
			$width,
			"flex-start",
			"flex-start",
			"flex-start",
			"center",
			"center",
		)};
	align-items: center;
	position: relative;
	background-color: ${({ theme, $width }) =>
		useWidth(
			$width,
			theme.colors.background,
			theme.colors.background,
			theme.colors.background,
			"#00000050",
			"#00000050",
		)};
    border-radius: 10px;
`;

export const Container = styled.View<BoxInterface>`
	width: ${({ $width }) =>
		useWidth($width, "100%", "100%", "100%", "60%", "40%")};
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Box = styled.View`
    width: 100%;
    flex: 1;
    padding: 0 16px;
`;
