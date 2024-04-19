import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Button, TextInput } from "verity-quik";
import { CHARGE_IN_CASH } from "../../../../services/graphql/payments/mutation";
import type { OrderType } from "../../../orders/types";
import { Keyboard } from "./keyboard";
import { Body } from "./styled";
import type { FormType } from "./types";

interface Props {
	order: OrderType;
}

export const Cash: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();

	const { id, financialDetails } = order;

	const { control, handleSubmit } = useForm<FormType>({
		defaultValues: {
			amount: "0.00",
		},
	});

	const [charge, { loading }] = useMutation(CHARGE_IN_CASH);
	const onSubmit = (data: FormType) => {
		const change =
			Math.round(
				(Number.parseFloat(data.amount) -
					Number.parseFloat(financialDetails.totalRestaurant)) *
					100,
			) / 100;

		charge({
			update(_, { data: { chargeInCash } }) {
				if (chargeInCash.success) {
					navigate("SuccessScreen", { change, order });
				} else if (chargeInCash.error === "payment-ready") {
					Toast.show({
						type: "error",
						text1: t("dine.error.title"),
						text2: t("error.payment.ready"),
					});
					navigate("OrdersNavigation", { screen: "OrdersScreen" });
				}
			},
			variables: {
				orderId: id,
				amount: Number.parseFloat(data.amount),
				change,
			},
		});
	};

	return (
		<Body>
			<Text variant="titleMedium" style={{ textAlign: "center" }}>
				{`${t("dine.total")} $ ${Number.parseFloat(
					financialDetails.totalRestaurant,
				).toFixed(2)}`}
			</Text>

			<TextInput
				control={control}
				name="amount"
				rules={{
					required: t("dine.error.amount"),
					min: {
						value: financialDetails.totalOrder,
						message: t("dine.error.amount-min"),
					},
				}}
				label={t("dine.amount")}
				leftIcon="currency-usd"
				editable={false}
			/>

			<Button
				mode="contained"
				style={{ marginTop: 15 }}
				loading={loading}
				onPress={handleSubmit(onSubmit)}
			>
				{t("dine.charge")}
			</Button>

			<Keyboard control={control} />
		</Body>
	);
};
