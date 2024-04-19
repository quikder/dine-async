import { DataTable } from "react-native-paper";
import styled from "styled-components/native";
import type { OrderStatusType } from "../../types";

export const Body = styled.TouchableOpacity`
    width: 100%;
    position: relative;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Row = styled(DataTable.Row)<{ $status: OrderStatusType }>`
    width: 100%;
    border-left-width: 10px;
    margin-bottom: 2px;
    border-left-color: ${({ $status, theme }) =>
			$status === "NEW"
				? "#ffcc33"
				: $status === "READY"
					? "#2e9cdc"
					: $status === "DELIVERED"
						? "#2e7d32"
						: //@ts-ignore
							theme?.colors?.error} ;
`;

export const Cell = styled(DataTable.Cell).attrs({
	textStyle: {
		textTransform: "capitalize",
	},
})``;