import { getLocales } from "expo-localization";
import { t } from "i18next";
import { capitalize } from "lodash";
//@ts-ignore
import moment from "moment/min/moment-with-locales";
import type React from "react";
import { Divider, Text } from "react-native-paper";
import type { OrderType } from "../../../orders/types";

export const Information: React.FC<OrderType> = ({
	customerName,
	deliveryType,
	tableNumber,
	createdAt,
}) => {
	const locale = getLocales()[0]?.languageCode;

	return (
		<>
			<Text variant="titleMedium">
				{`${t("dine.customer-name")}: ${capitalize(customerName)}`}
			</Text>

			<Text variant="titleMedium">
				{deliveryType === "DINE_IN"
					? `${t("dine.table")}: ${tableNumber}`
					: deliveryType === "TAKEOUT"
						? t("dine.takeout")
						: deliveryType === "PICKUP"
							? t("dine.pickup")
							: deliveryType === "DELIVERY" && t("dine.delivery")}
			</Text>

			<Text
				variant="labelSmall"
				style={{ color: "#87878a", textTransform: "capitalize" }}
			>
				{moment(createdAt)
					//@ts-ignore
					.locale(locale)
					.format("MMMM D, YYYY. HH:mm")}
			</Text>

			<Divider style={{ marginVertical: 5 }} />
		</>
	);
};
