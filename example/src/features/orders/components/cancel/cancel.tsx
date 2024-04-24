import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button, SegmentControl, TextInput } from "verity-quik";
import type { OrderType } from "../../types";
import { ItemDish } from "./item-dish";
import { Section } from "./styled";
import type { FormType } from "./types";

interface Props {
	order: OrderType;
}

export const Cancel: FC<Props> = ({ order }) => {
	const theme = useTheme();
	const { control, watch, setValue, handleSubmit } = useForm<FormType>({
		defaultValues: {
			isFullyCancelled: true,
			refundMethod: "cash",
			reason: "",
			password: "",
		},
	});

	const onSubmit = (data: FormType) => {
		console.log(data);
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

			<TextInput
				control={control}
				name="password"
				rules={{
					required: t("dine.error.password"),
				}}
				label={t("dine.password")}
				isPassword
			/>

			<Button
				style={{ marginTop: 10 }}
				buttonColor={theme.colors.error}
				// loading={cancelledLoading}
				onPress={handleSubmit(onSubmit)}
			>
				{t("dine.cancel")}
			</Button>
		</ScrollView>
	);
};
