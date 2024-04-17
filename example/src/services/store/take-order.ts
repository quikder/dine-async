import { create } from "zustand";
import type { DeliveryItemType } from "../../features/take-orders/types";

export interface DishType {
	keyId: string;
	id: string;
	quantity: number;
	name: string;
	price: number;
	picture: string | null;
	deliveryItemType: DeliveryItemType;
	note: string;
	modifiers: string[];
}

interface OrderState {
	dishes: DishType[];
	subtotal: number;
	totalItems: number;
	addToOrder: (dish: DishType) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
	dishes: [],
	subtotal: 0,
	totalItems: 0,
	addToOrder: (dish) =>
		set((state) => {
			const existingDishIndex = state.dishes.findIndex(
				(existingDish) => existingDish.keyId === dish.keyId,
			);

			if (existingDishIndex !== -1) {
				const updatedDishes = [...state.dishes];
				const existingDish = updatedDishes[existingDishIndex];

				if (existingDish) {
					existingDish.quantity += dish.quantity;
					existingDish.price  = existingDish.price * dish.quantity;

					return {
						dishes: updatedDishes,
						subtotal: state.subtotal + dish.price * dish.quantity,
						totalItems: state.totalItems + dish.quantity,
					};
				}
			} else {
				return {
					dishes: [...state.dishes, dish],
					subtotal: state.subtotal + dish.price * dish.quantity,
					totalItems: state.totalItems + dish.quantity,
				};
			}
			return state;
		}),
}));
