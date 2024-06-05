import { useMutation } from "@apollo/client";
import { t } from "i18next";
import moment from "moment";
import type React from "react";
import { useState } from "react";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { CHANGE_TABLE_AVAILABILITY } from "../../../services/graphql/tables/mutation";
import type { TableType } from "../types";
import { Body, Capacity } from "./item.styled";

export const ItemTable: React.FC<TableType> = ({
	id,
	number,
	capacity,
	isAvailable,
}) => {
	const { width } = useWindowDimensions();

	const [change, { loading }] = useMutation(CHANGE_TABLE_AVAILABILITY, {
		variables: {
			tableId: id,
		},
	});

	// Handle double press
	const [lastPress, setLastPress] = useState<number>(0);
	const handleDoublePress = () => {
		const currentTime = moment().valueOf();
		const doublePressDelay = 500;
		if (currentTime - lastPress <= doublePressDelay) {
			change();
		}
		setLastPress(currentTime);
	};

	return (
		<Body $width={width} $isAvailable={isAvailable} onPress={handleDoublePress}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<Text variant="titleLarge" style={{ color: "#fff" }}>
					{number}
				</Text>
			)}
			<Capacity>
				<Text style={{ color: "#fff" }}>{`${t(
					"dine.capacity",
				)}: ${capacity}`}</Text>
			</Capacity>
		</Body>
	);
};
