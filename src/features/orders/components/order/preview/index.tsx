import type { FC } from "react";
import type { OrderItemType } from "../../../types";
import { OrderItems } from "../../order-items";
import { Body } from "./styled";

interface Props {
	orderItems: OrderItemType[];
}

export const Preview: FC<Props> = ({ orderItems }) => {
	return (
		<Body>
			<OrderItems orderItems={orderItems} />
		</Body>
	);
};
