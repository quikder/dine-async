import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { Button, useUpdateEffect } from "verity-quik";
import { ListDishes } from "../../../../components/list-dishes";
import { TAKE_ORDER } from "../../../../services/graphql/take-order/mutation";
import {
	type DishType,
	useOrderStore,
} from "../../../../services/store/take-order";
import { Form } from "./form";
import type { FormType, OrderInformationType, OrderItemType } from "./types";

interface Props {
	restaurantId: string;
}

export const CompleteOrder: FC<Props> = ({ restaurantId }) => {
	const { width } = useWindowDimensions();
	const { goBack } = useNavigation();

	const { dishes, totalItems, subtotal } = useOrderStore();
	const clearOrder = useOrderStore((state) => state.clearOrder);

	useUpdateEffect(() => {
		if (width < 768) {
			if (totalItems === 0) {
				goBack();
			}
		}
	}, [totalItems]);

	const { control, watch, handleSubmit, reset } = useForm<FormType>({
		defaultValues: {
			customerName: "",
			deliveryType: "",
			tableNumber: "",
			deliveryInstructionsInput: {
				addressInput: {
					streetAddress: "",
					city: "",
					stateProvince: "",
					postalCode: "",
					country: "",
					latitude: null,
					longitude: null,
				},
				apartmentNumber: "",
				phoneNumber: "",
			},
		},
	});

	const [order, { loading }] = useMutation(TAKE_ORDER, {
		async update(_, { data: { takeOrderRestaurant } }) {
			console.log(takeOrderRestaurant);

			if (takeOrderRestaurant?.success) {
				Toast.show({
					type: "success",
					text1: t("dine.success.title"),
					text2: t("dine.success.make-order"),
				});

				reset();

				if (width < 768) {
					await goBack();
				}

				clearOrder();
			}
		},
	});
	const onSubmit = (data: FormType) => {
		order({
			variables: {
				restaurantId,
				orderInformationInput: getOrderInformationInput(data),
				deliveryInstructionsInput: data.deliveryInstructionsInput,
				orderItemInput: getDisheOrder(dishes),
				subtotal,
			},
		});
	};

	return (
		<View style={{ flex: 1, position: "relative", zIndex: -1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<Form control={control} watch={watch} />

				<ListDishes cart={dishes} isEdit={false} />

				<Button
					style={{ marginTop: 10 }}
					loading={loading}
					onPress={handleSubmit(onSubmit)}
				>
					{t("dine.make-order")}
				</Button>
			</ScrollView>
		</View>
	);
};

const getOrderInformationInput = (data: FormType): OrderInformationType => {
	return {
		customerName: data.customerName,
		tableNumber:
			data.deliveryType === "dine-in" ? Number.parseInt(data.tableNumber) : 0,
		deliveryType: data.deliveryType,
	};
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
