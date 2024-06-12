import { t } from "i18next";
import { Text } from "react-native-paper";
import { Fragment } from "react/jsx-runtime";
import type { OrderType } from "../../../types";
import { CardMethod } from "./card.method";
import { CashMethod } from "./cash.method";

export const PaymentType: React.FC<OrderType> = ({ payments }) => {
	return (
		<>
			{payments.map((payment) => (
				<Fragment key={payment.id}>
					<Text variant="titleMedium">{t("dine.payments-method")}</Text>

					{payment.paymentType === "cash" ? (
						<CashMethod {...payment} />
					) : payment.paymentType === "card" ? (
						<CardMethod {...payment} />
					) : (
						payment.paymentType === "custom" && (
							<>
								<Text>{payment?.customPayment.method}</Text>
							</>
						)
					)}
				</Fragment>
			))}
		</>
	);
};
