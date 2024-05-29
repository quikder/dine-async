import type React from "react";
import { useState } from "react";
import { Checkbox } from "react-native-paper";

import type { ModifierItemType, ModifierType } from "../../../types";
import { Price, Row } from "./styled";

export const CheckItem: React.FC<Props> = ({
	id,
	name,
	picture,
	price,
	modifier,
	onPress,
	selectedModifiers,
	modifierGroup,
}) => {
	console.log(modifierGroup.maxSelections);
	
	const [width, setWidth] = useState<number>(0);

	//@ts-ignore
	const exist = selectedModifiers.find((item) => item?.id === id)
		? "checked"
		: "unchecked";

	const totalItems = selectedModifiers.reduce(
		(accumulator: number, currentObject: ModifierItemType) => {
			if (currentObject.modifier && currentObject.modifier.id === modifier.id) {
				return accumulator + 1;
			}
			return accumulator;
		},
		0,
	);

	return (
		<Row onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
			<Checkbox.Item
				style={{
					width: width,
					paddingHorizontal: 2,
					paddingLeft: picture ? 50 : 2,
					paddingVertical: 4,
				}}
				label={name}
				status={exist}
				onPress={onPress}
				mode="android"
				disabled={
					exist === "unchecked" && modifierGroup.maxSelections === totalItems
				}
			/>

			{price > 0 && <Price>+ ${price}</Price>}
		</Row>
	);
};

interface Props extends ModifierItemType {
	onPress: () => void;
	selectedModifiers: [];
	modifierGroup: ModifierType;
}
