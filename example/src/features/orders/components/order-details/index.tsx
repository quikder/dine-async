import type { FC } from "react";
import { ScrollView } from "react-native";
import type { OrderType } from "../../types";
import { Status } from "./status";

interface Props {
	order: OrderType;
}

export const OrderDetails: FC<Props> = ({ order }) => {
	return (
		<ScrollView>
			<Status orderId={order?.id} status={order?.status} />
		</ScrollView>
	);
};
