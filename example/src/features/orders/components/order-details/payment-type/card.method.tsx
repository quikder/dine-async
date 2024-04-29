import {
	Entypo,
	FontAwesome,
	FontAwesome5,
	Fontisto,
} from "@expo/vector-icons";
import { t } from "i18next";
import type React from "react";
import { List, Text } from "react-native-paper";
import type { PaymentType } from "../../../types";

export const CardMethod: React.FC<PaymentType> = ({ cardPayment }) => {
	const brandCard = (brand: string, size: number, color: string) => {
		switch (brand) {
			case "visa":
				return <Fontisto size={size} color={color} name="visa" />;

			case "mastercard":
				return <FontAwesome size={size} color={color} name="cc-mastercard" />;

			case "amex":
				return <FontAwesome size={size} color={color} name="cc-amex" />;

			case "discover":
				return <FontAwesome size={size} color={color} name="cc-discover" />;

			case "diners":
				return <FontAwesome size={size} color={color} name="cc-diners-club" />;

			case "jcb":
				return <FontAwesome size={size} color={color} name="cc-jcb" />;

			case "apple":
				return <FontAwesome5 size={size} color={color} name="apple-pay" />;

			case "google":
				return <FontAwesome5 size={size} color={color} name="google-pay" />;

			default:
				return <Entypo size={size} color={color} name="credit-card" />;
		}
	};

	return (
		<>
			<Text variant="titleMedium">{t("dine.card")}</Text>

			<List.Item
				title={`******${cardPayment.cardNumber}`}
				left={(props) => (
					<List.Icon
						{...props}
						icon={({ size, color }) => {
							const brand = cardPayment.wallet
								? cardPayment.wallet
								: cardPayment.brand;
							return brandCard(brand, size, color);
						}}
					/>
				)}
			/>
		</>
	);
};
