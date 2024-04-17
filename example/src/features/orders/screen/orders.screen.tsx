import { t } from "i18next";
import { Text } from "react-native";
import { Layout } from "verity-quik";

export const OrdersScreen = () => {
	console.log("Order screen");

	return (
		<Layout title={t("orders")} useDrawer>
			<Text>Order</Text>
		</Layout>
	);
};
