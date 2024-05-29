import { useSubscription } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { useState } from "react";
import { Layout } from "verity-quik";
import { UPDATE_ORDER_DETAILS } from "../../../services/graphql/orders/subscriptions";
import { OrderDetails } from "../components/order-details";
import { Menu } from "../components/order-details/menu";
import type { OrderType } from "../types";

export const OrderDetailsScreen = () => {
	const { order, isEmployee, subscriptionRoom } = useRoute<any>().params;
	const [orderData, setOrderData] = useState<OrderType>(order);

	useSubscription(UPDATE_ORDER_DETAILS, {
		onData: (data) => {
			const updatedOrder: OrderType = data.data.data.updateOrderDetails.order;
			setOrderData(updatedOrder);
		},
		variables: {
			room: `${subscriptionRoom}-order-${order.id}`,
		},
	});

	return (
		<Layout
			title={t("dine.order-details")}
			back
			actionPersonalized={<Menu order={order} />}
		>
			<OrderDetails order={orderData} isEmployee={isEmployee} />
		</Layout>
	);
};
