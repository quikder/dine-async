import { useSubscription } from "@apollo/client";
import { t } from "i18next";
import moment from "moment";
import { type FC, type ReactNode, createContext } from "react";
import Toast from "react-native-toast-message";
import type { OrderType } from "../../features/orders/types";
import { ALL_ORDERS } from "../graphql/orders/query";
import { NEW_ORDER } from "../graphql/orders/subscriptions";

export const OrderContext = createContext<null>(null);

interface Props {
	children: ReactNode;
	restaurantId: string;
	subscriptionRoom: string;
	serverBy: string;
}
export const OrderProvider: FC<Props> = ({
	children,
	restaurantId,
	subscriptionRoom,
	serverBy,
}) => {
	useSubscription(NEW_ORDER, {
		onData: (data) => {
			const client = data.client;

			const cacheOrders: any = client.readQuery({
				query: ALL_ORDERS,
				variables: { restaurantId, date: moment().format("YYYY-MM-DD") },
			});

			const newOrder: OrderType = data.data.data.newOrder.order;
			console.log(newOrder);

			if (serverBy !== newOrder.servedBy.name) {
				sendNotification(newOrder);
			}

			if (cacheOrders) {
				const { allOrders } = cacheOrders;
				//@ts-ignore
				client.writeQuery({
					query: ALL_ORDERS,
					variables: {
						restaurantId,
						date: moment().format("YYYY-MM-DD"),
					},
					data: {
						allOrders: [...allOrders, data.data.data.newOrder.order],
					},
				});
			}
		},
		variables: {
			room: subscriptionRoom,
		},
		fetchPolicy: "cache-first",
	});

	return <OrderContext.Provider value={null}>{children}</OrderContext.Provider>;
};

const sendNotification = (newOrder: OrderType) => {
	const tableNumber = newOrder.tableNumber;
	Toast.show({
		type: "info",
		text1: t("dine.new-order.title"),
		text2:
			newOrder.deliveryType === "DINE_IN"
				? t("dine.new-order.dine-in", { tableNumber })
				: newOrder.deliveryType === "TAKEOUT"
					? t("dine.new-order.takeout")
					: newOrder.deliveryType === "PICKUP"
						? t("dine.new-order.pickup")
						: newOrder.deliveryType === "DELIVERY"
							? t("dine.new-order.delivery")
							: "",
	});
};
