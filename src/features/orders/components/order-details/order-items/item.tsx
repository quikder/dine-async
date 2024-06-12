import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import { capitalize } from "lodash";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import type { OrderItemType } from "../../../types";
import { GroupView, Image, Row } from "./styled";

export const Item: React.FC<OrderItemType> = ({
	dish,
	quantity,
	isDelivered,
	modifierItems,
	note,
}) => {
	const theme = useTheme();
	const source = dish?.picture
		? { uri: dish.picture }
		: "";

	const groupedData: {
		[key: string]: { modifierName: string; items: string[] };
	} = {};

	modifierItems.map((item) => {
		const modifierId = item.modifier.id;

		if (!groupedData[modifierId]) {
			groupedData[modifierId] = {
				modifierName: item.modifier.name,
				items: [],
			};
		}

		groupedData?.[modifierId]?.items.push(item.name);
	});

	return (
		<Row>
			<DataTable.Row>
				<DataTable.Cell>
					<View>
						{dish.picture && <Image transition={0} source={source} />}
						<Text>{capitalize(dish?.name)}</Text>

						{Object.values(groupedData).map((group, index) => (
							<GroupView
								key={group.modifierName}
								$isLast={modifierItems.length - 1 === index}
							>
								<Text variant="labelMedium" style={{ color: "#7a7a7a" }}>
									{`${capitalize(group.modifierName)}: `}
									{group.items.map((item, index) => {
										const isLast = group.items.length - 1 !== index;

										return (
											<Text
												key={item}
												variant="labelSmall"
												style={{ color: "#7a7a7a" }}
											>
												{`${capitalize(item)}${isLast ? ", " : ""} `}
											</Text>
										);
									})}
								</Text>
							</GroupView>
						))}
					</View>
				</DataTable.Cell>
				<DataTable.Cell numeric>{quantity}</DataTable.Cell>
				<DataTable.Cell numeric>
					{isDelivered ? (
						<Ionicons name="checkmark" size={15} color={theme.text} />
					) : (
						<Ionicons name="close" size={15} color={theme.text} />
					)}
				</DataTable.Cell>
			</DataTable.Row>
			{note && <Text variant="labelSmall">{`${t("dine.note")}: ${note}`}</Text>}
		</Row>
	);
};
