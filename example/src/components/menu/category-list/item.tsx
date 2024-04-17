import { capitalize } from "lodash";
import type { Dispatch, FC, SetStateAction } from "react";
import { Text } from "react-native-paper";
import { ItemBody } from "./styled";

interface Props {
	id: string;
	name: string;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
}

export const Item: FC<Props> = ({
	id,
	name,
	categoryFilter,
	setCategoryFilter,
}) => {
	return (
		<ItemBody
			onPress={() => setCategoryFilter(id)}
			$isActive={categoryFilter === id}
		>
			<Text style={{ textAlign: "center" }}>{capitalize(name)}</Text>
		</ItemBody>
	);
};
