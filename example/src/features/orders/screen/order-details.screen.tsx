import { t } from "i18next";
import { Text } from "react-native-paper";
import { Layout } from "verity-quik";

export const OrderDetailsScreen = () => {
	return (
		<Layout title={t("dine.order-details")} back>
			<Text>Order Details</Text>
		</Layout>
	);
};
