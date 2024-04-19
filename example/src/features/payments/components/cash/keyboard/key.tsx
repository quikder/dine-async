import { Feather } from "@expo/vector-icons";
import { selectionAsync } from "expo-haptics";
import type { FC } from "react";
import { Text } from "react-native-paper";
import { KeyContent } from "./styled";

interface Props {
	value?: string;
	useIcon?: boolean;
	onPress: () => void;
}

export const Key: FC<Props> = ({ value, useIcon, onPress }) => {
	const handlePress = () => {
		onPress();
		selectionAsync();
	};

	return (
		<KeyContent onPress={handlePress}>
			{useIcon ? (
				<Feather name="delete" size={25} />
			) : (
				<Text variant="titleLarge">{value}</Text>
			)}
		</KeyContent>
	);
};
