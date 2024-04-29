import type { FC } from "react";
import { ScrollView } from "react-native";
import type { OrderType } from "../../types";
import { FinancialDetails } from "./financial-details";
import { Information } from "./information";
import { OrderItems } from "./order-items";
import { PaymentType } from "./payment-type";
import { Status } from "./status";

interface Props {
	order: OrderType;
	isEmployee: boolean;
}

export const OrderDetails: FC<Props> = ({ order, isEmployee }) => {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Status orderId={order?.id} status={order?.status} />
			<Information {...order} />
			<OrderItems {...order} />
			<FinancialDetails isEmployee={isEmployee} {...order.financialDetails} />
			{order.isPaid && <PaymentType {...order} />}
		</ScrollView>
	);
};
