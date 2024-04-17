import { Platform } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const ItemBody = styled(Card)<ItemProps>`
    min-width: 60px;
    padding: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    opacity: ${({ $isActive }) =>
			$isActive ? 1 : Platform.OS === "ios" ? 0.5 : 0.8};
`;

interface ItemProps {
	$isActive: boolean;
}
