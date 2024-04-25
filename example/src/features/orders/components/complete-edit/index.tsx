import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { Button, useUpdateEffect } from "verity-quik";
import { ListDishes } from "../../../../components/list-dishes";
import { EDIT_ORDER } from "../../../../services/graphql/orders/mutation";
import {
	type DishType,
	useEditOrderStore,
} from "../../../../services/store/edit-order";
import type { OrderItemType } from "../../../take-orders/components/complete-order/types";

interface Props {
	orderId: string;
}

export const CompleteEdit: FC<Props> = ({ orderId }) => {
	const { goBack } = useNavigation();
	const { width } = useWindowDimensions();
	const { dishes, totalItems, subtotal } = useEditOrderStore();
	const clearCart = useEditOrderStore((state) => state.clearOrder);

	const [edit, { loading }] = useMutation(EDIT_ORDER, {
		async update(_, { data: { editOrder } }) {
			if (editOrder?.success) {
				Toast.show({
					type: "success",
					text1: t("dine.success.title"),
					text2: t("dine.success.update-order"),
				});
				clearCart();

				if (width < 768) {
					await goBack();
				}
			}
		},
	});

	const handleSubmit = () => {
		edit({
			variables: {
				orderId: orderId,
				orderItemInput: getDisheOrder(dishes),
				subtotal,
			},
		});
	};

	useUpdateEffect(() => {
		if (totalItems <= 0) {
			if (width < 768) {
				goBack();
			}
		}
	}, [totalItems]);

	return (
		<View style={{ flex: 1, position: "relative", zIndex: -1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<ListDishes cart={dishes} isEdit={true} />

				<Button
					style={{ marginTop: 10 }}
					loading={loading}
					onPress={handleSubmit}
				>
					{t("dine.make-order")}
				</Button>
			</ScrollView>
		</View>
	);
};

const getDisheOrder = (dishes: DishType[]): OrderItemType[] => {
	return dishes.map((item: DishType) => {
		return {
			dishId: item.id,
			price: item.price,
			quantity: item.quantity,
			isForRestaurant: item.deliveryItemType === "dine-in",
			note: item.note,
			modifierItems: item.modifiers.map((item: any) => item?.id),
		};
	});
};
