import type { FC } from "react";
import { ScrollView } from "react-native";
import type { OrderType } from "../../types";
import { Information } from "./information";
import { OrderItems } from "./order-items";
import { Status } from "./status";

interface Props {
	order: OrderType;
}

export const OrderDetails: FC<Props> = ({ order }) => {
	
	return (
		<ScrollView>
			<Status orderId={order?.id} status={order?.status} />
			<Information {...order} />
			<OrderItems {...order}  />
		</ScrollView>
	);
};
