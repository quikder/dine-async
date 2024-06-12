import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { Button, TextInput } from "verity-quik";
import { CHARGE_PERSONALIZED } from "../../../../services/graphql/payments/mutation";
import type { OrderType } from "../../../orders/types";
import { Body } from "../qr/styled";

interface Props {
	order: OrderType;
}

export const Custom: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();
	const { control, handleSubmit } = useForm<Form>({
		defaultValues: {
			method: "",
		},
	});

	const [charge, { loading }] = useMutation(CHARGE_PERSONALIZED);
	const onSubmit = (data: Form) => {
		charge({
			update(_, { data: { chargePersonalized } }) {
				if (chargePersonalized.success) {
					navigate("SuccessScreen", { order });
				} else if (chargePersonalized.error === "payment-ready") {
					Toast.show({
						type: "error",
						text1: t("dine.error.title"),
						text2: t("error.payment.ready"),
					});
                    navigate("OrdersNavigation", { screen: "OrdersScreen" });
				}
			},
			variables: {
				orderId: order.id,
				method: data.method,
			},
		});
	};

	return (
		<Body>
			<TextInput
				control={control}
				name="method"
				rules={{
					required: t("dine.error.charge.personalized"),
				}}
				label={t("dine.charge-personalized")}
				multiline
				numberOfLines={4}
				useKeyboardAccesory
			/>

			<Button
				style={{ marginTop: 20 }}
				onPress={handleSubmit(onSubmit)}
				loading={loading}
			>
				{t("dine.send")}
			</Button>
		</Body>
	);
};

interface Form {
	method: string;
}
