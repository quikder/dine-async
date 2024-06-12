import type React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Controls } from "./styled";

export const ControlQuantity: React.FC<Props> = ({
	quantity,
	size,
	onMinusPress,
	onPlusPress,
	disabledMinus,
}) => {
	return (
		<View style={{ flexDirection: "row" }}>
			<Controls>
				<IconButton
					icon="minus"
					size={size === "small" ? 20 : 35}
					onPress={disabledMinus ? () => {} : onMinusPress}
					disabled={disabledMinus}
				/>
				<Text variant={size === "small" ? "bodyMedium" : "titleMedium"}>
					{quantity}
				</Text>
				<IconButton
					icon="plus"
					size={size === "small" ? 20 : 35}
					onPress={onPlusPress}
				/>
			</Controls>
		</View>
	);
};

interface Props {
	quantity: number;
	size: "small" | "large";
	onMinusPress: () => void;
	onPlusPress: () => void;
	disabledMinus?: boolean;
}
