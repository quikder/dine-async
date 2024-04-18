import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { Button, useUpdateEffect } from "verity-quik";
import { ListDishes } from "../../../../components/list-dishes";
import { useOrderStore } from "../../../../services/store/take-order";
import { Form } from "./form";
import type { FormType } from "./types";

interface Props {
	restaurantId: string;
}

export const CompleteOrder: FC<Props> = () => {
	const { width } = useWindowDimensions();
	const { goBack } = useNavigation();

	const { dishes, totalItems, clearOrder } = useOrderStore();

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

	const onSubmit = (data: FormType) => {
		console.log(data);
	};

	return (
		<View style={{ flex: 1, position: "relative", zIndex: -1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<Form control={control} watch={watch} />

				<ListDishes cart={dishes} isEdit={false} />

				<Button onPress={handleSubmit(onSubmit)}>{t("dine.make-order")}</Button>
			</ScrollView>
		</View>
	);
};
