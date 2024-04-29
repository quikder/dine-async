import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { OrderDetails } from "../components/order-details";
import { Menu } from "../components/order-details/menu";

export const OrderDetailsScreen = () => {
	const { order } = useRoute<any>().params;

	return (
		<Layout
			title={t("dine.order-details")}
			back
			actionPersonalized={<Menu order={order} />}
		>
			<OrderDetails order={order} />
		</Layout>
	);
};
