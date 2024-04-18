import type { FC } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Form } from "./form";
import type { FormType } from "./types";

interface BillSettingType {
	taxPercentage: number;
	isIncludeTip: boolean;
	tipPercentage: number;
}

interface Props {
	restaurantId: string;
	billStings: BillSettingType;
}

export const CompleteOrder: FC<Props> = () => {
	const { control, watch } = useForm<FormType>({
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

	return (
		<View style={{ flex: 1, position: "relative", zIndex: -1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<Form control={control} watch={watch} />
			</ScrollView>
		</View>
	);
};
