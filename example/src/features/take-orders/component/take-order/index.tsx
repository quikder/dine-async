import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { DeliveryBar } from "../../../../components/delivery-bar";
import type { DeliveryItemType } from "../../types";
import { Body, FormBox, MenuBox } from "./styled";

export const TakeOrder = () => {
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
				<Text>Menu</Text>
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
