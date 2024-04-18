import { type FC, useState } from "react";
import { useWindowDimensions } from "react-native";
import { DeliveryBar } from "../../../../components/delivery-bar";
import { Menu } from "../../../../components/menu";
import type { DeliveryItemType } from "../../types";
import { Form } from "../form";
import { Body, FormBox, MenuBox } from "./styled";

interface Props {
	restaurantId: string;
}

export const TakeOrder: FC<Props> = ({ restaurantId }) => {
	const { width } = useWindowDimensions();
	const [deliveryItemType, setDeliveryItemType] =
		useState<DeliveryItemType>("dine-in");

	return (
		<Body $width={width}>
			<MenuBox $width={width}>
				<DeliveryBar
					deliveryItemType={deliveryItemType}
					setDeliveryItemType={setDeliveryItemType}
				/>
				<Menu
					restaurantId={restaurantId}
					deliveryItemType={deliveryItemType}
					isEdit={false}
				/>
			</MenuBox>

			<FormBox $width={width}>
				<Form />
			</FormBox>
		</Body>
	);
};
