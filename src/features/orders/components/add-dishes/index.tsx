import { type FC, useState } from "react";
import { useWindowDimensions } from "react-native";
import { DeliveryBar } from "../../../../components/delivery-bar";
import { Menu } from "../../../../components/menu";
import type { DeliveryItemType } from "../../../take-orders/types";
import { Form } from "./form";
import { Body, FormBox, MenuBox } from "./styled";

interface Props {
	restaurantId: string;
	orderId: string
}

export const AddDishes: FC<Props> = ({ restaurantId, orderId }) => {
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
					isEdit={true}
				/>
			</MenuBox>

			<FormBox $width={width}>
				<Form orderId={orderId} />
			</FormBox>
		</Body>
	);
};
