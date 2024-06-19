import { t } from "i18next";
import { capitalize } from "lodash";
import type { FC } from "react";
import { Checkbox, Text } from "react-native-paper";
import { ControlQuantity } from "../../../../../components/control-quantity";
import { useCancelOrder } from "../../../../../services/store/cancel-order";
import type { DeliveryType, OrderItemType } from "../../../types";
import { Body, Item } from "./styled";

/**
 * ItemDish component represents a single dish item in the order list.
 * It displays the dish name, quantity, and provides functionality to add or remove the dish from the order.
 * @param {OrderItemType} item - The dish item object containing details such as id, dish name, quantity, price, etc.
 * @param {DeliveryType} deliveryType - The type of delivery (e.g., DINE_IN, TAKE_AWAY, DELIVERY).
 * @returns {JSX.Element} - The rendered JSX element representing the dish item.
 */

interface Props {
	item: OrderItemType;
	deliveryType: DeliveryType;
}

export const ItemDish: FC<Props> = ({ item, deliveryType }) => {
	const { id, dish, quantity, price, isForRestaurant, modifierItems } = item;
	const { name } = dish;

	const { dishes } = useCancelOrder();
	const addItem = useCancelOrder((state) => state.addToCancel);
	const removeItem = useCancelOrder((state) => state.removeFromCancel);

	/**
	 * Checks if the dish item is already added to the order.
	 * @returns {number | undefined} - The quantity of the dish item in the order, or undefined if not found.
	 */
	const isChecked = () => {
		const item = dishes.find((item) => item.id === id)?.quantity;
		return item;
	};

	/**
	 * Handles the selection of the dish item.
	 * If the dish item is already added to the order, it removes it. Otherwise, it adds it to the order.
	 */
	const handleSelect = () => {
		if (isChecked()) {
			removeItem(id, quantity);
		} else {
			addItem({
				id,
				quantity: 1,
				price,
			});
		}
	};

	return (
		<Body>
			<Item>
				<Checkbox.Item
					labelVariant="bodyMedium"
					status={isChecked() ? "checked" : "unchecked"}
					label={`${quantity} - ${capitalize(name)}`}
					mode="android"
					onPress={handleSelect}
				/>

				{!isForRestaurant && deliveryType === "DINE_IN" && (
					<Text variant="labelSmall" style={{ marginTop: -20, marginLeft: 40 }}>
						{t("dine.takeout")}
					</Text>
				)}

				{modifierItems.length > 0 && (
					<>
						<Text
							key={item.id}
							variant="labelSmall"
							style={{ marginTop: -20, marginLeft: 40 }}
						>
							{modifierItems
								.map((modifier) => {
									return modifier.name;
								})
								.join(", ")}
						</Text>
					</>
				)}

				{isChecked() && quantity > 1 && (
					<ControlQuantity
						size="small"
						// @ts-ignore
						quantity={dishes.find((item) => item.id === id)?.quantity}
						onMinusPress={() => removeItem(id, 1)}
						onPlusPress={() => {
							// @ts-ignore
							dishes.find((item) => item.id === id)?.quantity < quantity
								? addItem({
										id,
										quantity: 1,
										price,
									})
								: {};
						}}
					/>
				)}
			</Item>
		</Body>
	);
};
