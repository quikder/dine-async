import { type FC, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { DeliveryBar } from "../../../../components/delivery-bar";
import { Menu } from "../../../../components/menu";
import { useOrderStore } from "../../../../services/store/take-order";
import type { DeliveryItemType } from "../../types";
import { Body, FormBox, MenuBox } from "./styled";

interface Props {
	restaurantId: string;
}

export const TakeOrder: FC<Props> = ({ restaurantId }) => {
	const { width } = useWindowDimensions();
	const [deliveryItemType, setDeliveryItemType] =
		useState<DeliveryItemType>("dine-in");

	const { dishes, subtotal } = useOrderStore();
	console.log(dishes);
	console.log(subtotal);
	

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
				<Text>Form</Text>
				{/* <Form
					restaurantId={restaurantId}
					billSettings={billSettings}
					isEmployee={isEmployee}
				/> */}
			</FormBox>
		</Body>
	);
};
