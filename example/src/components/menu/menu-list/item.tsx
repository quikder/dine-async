import { selectionAsync } from "expo-haptics";
import { capitalize } from "lodash";
import { type FC, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { useWidth } from "verity-quik";
import type { DeliveryItemType } from "../../../features/take-orders/types";
import { useOrderStore } from "../../../services/store/take-order";
import type { DishType } from "../types";
import { Body, Image, NameContent } from "./styled";

interface Props {
	dish: DishType;
	deliveryItemType: DeliveryItemType;
	isEdit?: boolean;
}

export const Item: FC<Props> = ({ dish, deliveryItemType, isEdit }) => {
	const { width } = useWindowDimensions();
	const { id, name, picture, price, requiresModifier } = dish;
	const source = picture
		? { uri: picture }
		: require("../../../../assets/assets/images/noimg.png");

	const addDish = useOrderStore((state) => state.addToOrder);

	const [isPress, setIsPress] = useState<boolean>(false);

	// Modifiers
	const [modifierModalVisible, setModifierModalVisible] =
		useState<boolean>(false);
	const openModifierModal = () => {
		setModifierModalVisible(true);
		selectionAsync();
	};

	const handleAddDish = () => {
		if (isEdit) {
		} else {
			addDish({
				keyId: `${id}-${deliveryItemType}`,
				id,
				quantity: 1,
				name,
				price,
				picture,
				deliveryItemType,
				note: "",
				modifiers: [],
			});
		}
		selectionAsync();
	};

	return (
		<Body
			$width={width}
			$isPress={isPress}
			$requiresModifier={requiresModifier}
			onPress={requiresModifier ? openModifierModal : handleAddDish}
			onLongPress={openModifierModal}
			onPressIn={() => setIsPress(true)}
			onPressOut={() => setIsPress(false)}
			$isEdit={isEdit}
		>
			<Image transition={0} source={source} />

			<NameContent intensity={10}>
				<Text
					variant={useWidth(
						width,
						"labelSmall",
						"labelSmall",
						"labelSmall",
						"labelSmall",
						"labelLarge",
					)}
					style={{ color: "#fff" }}
				>
					{capitalize(name)}
				</Text>
			</NameContent>
		</Body>
	);
};
