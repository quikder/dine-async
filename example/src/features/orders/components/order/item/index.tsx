import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { DataTable } from "react-native-paper";
import { useTheme } from "styled-components/native";
import type { OrderType } from "../../../types";
import { Body, Cell, Row } from "./styled";

interface Props {
	order: OrderType;
	isEmployee: boolean;
	restaurantId: string
}

export const Item: FC<Props> = ({ order, isEmployee }) => {
	const { navigate } = useNavigation<any>();

	const {
		status,
		customerName,
		deliveryType,
		tableNumber,
		financialDetails,
		isPaid,
	} = order;

	const theme = useTheme();

	return (
		<>
			<Body onPress={() => navigate("OrderDetailsScreen", { order })}>
				<Row $status={status}>
					<Cell>{customerName}</Cell>

					<Cell numeric>
						{deliveryType === "TAKEOUT"
							? t("dine.takeout")
							: deliveryType === "PICKUP"
								? t("dine.pickup")
								: deliveryType === "DELIVERY"
									? t("dine.delivery")
									: tableNumber}
					</Cell>

					<DataTable.Cell
						numeric
						textStyle={{
							color: isPaid ? theme.colors.success : theme.colors.error,
						}}
					>
						$
						{
							//@ts-ignore
							Number.parseFloat(
								isEmployee
									? financialDetails.totalOrder
									: financialDetails.totalRestaurant,
							).toFixed(2)
						}
					</DataTable.Cell>
				</Row>
			</Body>
		</>
	);
};
