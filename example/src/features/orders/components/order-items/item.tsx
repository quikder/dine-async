import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import { capitalize } from "lodash";
import type { FC } from "react";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import type { OrderItemType } from "../../types";
import { Image, Row } from "./styled";

export const Item: FC<OrderItemType> = ({
	dish,
	quantity,
	isDelivered,
	note,
}) => {
	const theme = useTheme();

	return (
		<Row>
			<DataTable.Row style={{ marginVertical: 15 }}>
				<DataTable.Cell>
					<View>
						{dish.picture && (
							<Image transition={0} source={{ uri: dish.picture }} />
						)}
						<Text variant="titleSmall">{capitalize(dish.name)}</Text>
					</View>
				</DataTable.Cell>
				<DataTable.Cell numeric>{quantity}</DataTable.Cell>
				<DataTable.Cell numeric>
					{isDelivered ? (
						<Ionicons name="checkmark" size={15} color={theme.colors.text} />
					) : (
						<Ionicons name="close" size={15} color={theme.colors.text} />
					)}
				</DataTable.Cell>
			</DataTable.Row>
			{note && <Text variant="labelSmall">{`${t("dine.note")}: ${note}`}</Text>}
		</Row>
	);
};

//TODO add modifiers