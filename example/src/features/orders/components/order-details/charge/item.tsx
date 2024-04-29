import type React from "react";
import { Text } from "react-native-paper";
import { Method } from "./styled";

export const Item: React.FC<Props> = ({ icon, text, onPress }) => {
	return (
		<Method onPress={onPress}>
			{icon}

			<Text style={{ textAlign: "center", marginTop: 5 }}>{text}</Text>
		</Method>
	);
};

interface Props {
	icon: React.ReactElement;
	text: string;
	onPress: () => void;
}
