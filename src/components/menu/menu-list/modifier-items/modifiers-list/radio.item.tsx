import { capitalize } from "lodash";
import type React from "react";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import type { ModifierItemType } from "../../../types";
import { Img, Price, Row } from "./styled";

export const RadioItem: React.FC<ModifierItemType> = ({
	id,
	name,
	picture,
	price,
}) => {
	const [width, setWidth] = useState<number>(0);

	return (
		<Row onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
			{picture && <Img source={{ uri: picture }} transition={0} />}
			<RadioButton.Item
				style={{
					width: width,
					paddingHorizontal: 2,
					paddingLeft: picture ? 50 : 2,
					paddingVertical: 4,
				}}
				label={`${capitalize(name)}`}
				value={`${id}`}
				mode="android"
			/>
			{price > 0 && <Price>+ ${price}</Price>}
		</Row>
	);
};
