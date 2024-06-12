import { t } from "i18next";
import { capitalize } from "lodash";
import { type FC, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useEditOrderStore } from "../../services/store/edit-order";
import { type DishType, useOrderStore } from "../../services/store/take-order";
import { ControlQuantity } from "../control-quantity";
import {
	Content,
	Image,
	InformationBox,
	Row,
	SwipContent,
} from "./item.styled";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props extends DishType {
	isEdit?: boolean;
}

export const Item: FC<Props> = ({
	keyId,
	id,
	picture,
	name,
	price,
	deliveryItemType,
	modifiers,
	quantity,
	isEdit,
	note,
}) => {
	const addDish = isEdit
		? useEditOrderStore((state) => state.addToOrder)
		: useOrderStore((state) => state.addToOrder);
	const removeDish = isEdit
		? useEditOrderStore((state) => state.removeFromOrder)
		: useOrderStore((state) => state.removeFromOrder);

	const modifiersSet = modifiers.map((objeto: any) => objeto.name);

	// Swippeable
	const swipeableRef = useRef<Swipeable>(null);
	const handlePress = () => {
		swipeableRef?.current?.close();
		removeDish(keyId, quantity);
	};
	const renderLeftActions = () => {
		return (
			<SwipContent onPress={handlePress}>
				{/* //TODO add material commitis */}
				{/* <MaterialCommunityIcons name="delete" size={25} color="#fff" /> */}
				<Text variant="labelSmall" style={{ color: "#fff" }}>
					{t("dine.delete.delete")}
				</Text>
			</SwipContent>
		);
	};

	return (
		<Swipeable
			renderRightActions={renderLeftActions}
			overshootRight={false}
			ref={swipeableRef}
			containerStyle={{ marginTop: 5 }}
		>
			<Row>
				{picture && <Image source={{ uri: picture }} />}
				<Content $haveImage={!!picture}>
					<InformationBox>
						<Text>{capitalize(name)}</Text>

						{deliveryItemType === "takeout" && (
							<Text variant="bodySmall">{t("dine.takeout")}</Text>
						)}
						{modifiers.length > 0 && (
							<Text
								variant="labelSmall"
								style={{ textTransform: "capitalize" }}
							>
								{modifiersSet.join(", ")}
							</Text>
						)}
					</InformationBox>

					<ControlQuantity
						quantity={quantity}
						size="small"
						onMinusPress={() => removeDish(keyId, 1)}
						onPlusPress={() => {
							addDish({
								keyId,
								id,
								name,
								picture,
								deliveryItemType,
								quantity: 1,
								price: price,
								note,
								modifiers,
							});
						}}
					/>
				</Content>
			</Row>
		</Swipeable>
	);
};
