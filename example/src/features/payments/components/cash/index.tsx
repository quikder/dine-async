import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native-paper";
import { Button, TextInput } from "verity-quik";
import type { OrderType } from "../../../orders/types";
import { Keyboard } from "./keyboard";
import { Body } from "./styled";
import type { FormType } from "./types";

interface Props {
	order: OrderType;
}

export const Cash: FC<Props> = ({ order }) => {
	const { financialDetails } = order;

	const { control, handleSubmit } = useForm<FormType>({
		defaultValues: {
			amount: "0.00",
		},
	});

	const onSubmit = (data: FormType) => {
		const change =
			Math.round(
				(Number.parseFloat(data.amount) -
					Number.parseFloat(financialDetails.totalRestaurant)) *
					100,
			) / 100;

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
				// loading={loading}
				onPress={handleSubmit(onSubmit)}
			>
				{t("dine.charge")}
			</Button>

			<Keyboard control={control} />
		</Body>
	);
};
