import type { FC } from "react";
import type { DishType } from "../../services/store/take-order";
import { Item } from "./item";
import { Body } from "./styled";

interface Props {
	cart: DishType[];
	isEdit: boolean;
}

export const ListDishes: FC<Props> = ({ cart, isEdit }) => {
	return (
		<Body>
			{cart.map((item) => {
				return <Item key={item.keyId} {...item} isEdit={isEdit} />;
			})}
		</Body>
	);
};
