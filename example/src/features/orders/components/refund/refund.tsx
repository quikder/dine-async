import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components/native";
import { Button, SegmentControl, TextInput } from "verity-quik";
import { REFUND_ORDER } from "../../../../services/graphql/orders/mutation";
import { useCancelOrder } from "../../../../services/store/cancel-order";
import type { OrderType } from "../../types";
import { ItemDish } from "./item-dish";
import { Section } from "./styled";
import type { FormType } from "./types";

interface Props {
	order: OrderType;
}

export const Refund: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();
	const theme = useTheme();
	const { dishes } = useCancelOrder();
	const clearItems = useCancelOrder((state) => state.clearOrder);

	const { control, watch, setValue, handleSubmit } = useForm<FormType>({
		defaultValues: {
			isFullyCancelled: true,
			refundMethod: "cash",
			reason: "",
			password: "",
		},
	});

	const [refundOrder, { loading, data }] = useMutation(REFUND_ORDER, {
		update(_, { data: { refoundOrder } }) {
			if (refoundOrder?.success) {
				navigate("OrderScreen");
				Toast.show({
					type: "success",
					text1: t("dine.success.title"),
					text2: t("dine.success.cancelled-order"),
				});
			} else if (refoundOrder?.error === "ready-cancelled") {
				Toast.show({
					type: "error",
					text1: t("dine.error.title"),
					text2: t("dine.error.ready-cancelled"),
				});

				clearItems();
				navigate("OrderScreen");
			}
		},
	});
	const onSubmit = (data: FormType) => {
		const totalItems = data.isFullyCancelled
			? order.items.reduce((acc, item) => acc + item.quantity, 0)
			: //@ts-ignore
				dishes.reduce((acc, item) => acc + item.quantity, 0);

		refundOrder({
			variables: {
				orderId: order.id,
				password: data.password,
				isFullyCancelled: data.isFullyCancelled,
				itemCancellationInput: dishes,
				reason: data.reason,
				totalItems,
				refundMethod: data.refundMethod,
				amount: order.financialDetails.totalOrder,
			},
		});
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			automaticallyAdjustKeyboardInsets
		>
			<Section>
				<SegmentControl
					segments={[t("dine.cancel-total"), t("dine.cancel-dish")]}
					onChange={(index: number) => {
						setValue("isFullyCancelled", index === 0);
					}}
					value={watch("isFullyCancelled") ? 0 : 1}
				/>
			</Section>

			{!watch("isFullyCancelled") && (
				<>
					<Text variant="titleMedium">{t("dine.dishes")}</Text>

					{order.items.map((item) => (
						<ItemDish
							key={item.id}
							item={item}
							deliveryType={order.deliveryType}
						/>
					))}

					<Divider style={{ borderWidth: 0.2, marginBottom: 10 }} />
				</>
			)}

			<TextInput
				control={control}
				name="reason"
				label={t("dine.cancel-reason")}
				multiline
				numberOfLines={4}
				textContentType="none"
				useKeyboardAccesory
				autoComplete="off"
			/>

			{order.payments[0]?.paymentType !== "cash" && (
				<Section>
					<Text variant="titleMedium" style={{ marginBottom: 10 }}>
						{t("dine.refound.instructions")}
					</Text>
					<SegmentControl
						segments={[t("dine.refund-cash"), t("dine.refund-original")]}
						onChange={(index: number) => {
							setValue("refundMethod", index === 0 ? "cash" : "original");
						}}
						value={watch("refundMethod") === "cash" ? 0 : 1}
					/>
				</Section>
			)}

			<TextInput
				control={control}
				name="password"
				rules={{
					required: t("dine.error.password"),
				}}
				label={t("dine.password")}
				isPassword
				error={data?.refoundOrder?.error === "wrong password"}
				helperText={
					data?.refoundOrder?.error === "wrong password"
						? t("dine.error.password")
						: ""
				}
			/>

			{watch("refundMethod") === "cash" ? (
				<Text style={{ marginVertical: 10 }}>
					Debes debolver el total de ${order.financialDetails.totalOrder} en
					efectivo
				</Text>
			) : (
				<Text style={{ marginVertical: 10 }}>
					Se devolvera el total de ${order.financialDetails.totalOrder} a la
					tarjeta con la que se realizo el pago en un periodo de 7 dias
				</Text>
			)}

			<Button
				style={{ marginTop: 10 }}
				buttonColor={theme.colors.error}
				loading={loading}
				onPress={handleSubmit(onSubmit)}
			>
				{t("dine.refund")}
			</Button>
		</ScrollView>
	);
};
