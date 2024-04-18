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
	removeFromOrder: (keyId: string, quantity: number) => void;
	clearOrder: () => void;
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

					const subtotal = Number.parseFloat(
						(state.subtotal + dish.price * dish.quantity).toFixed(2),
					);

					return {
						dishes: updatedDishes,
						subtotal,
						totalItems: state.totalItems + dish.quantity,
					};
				}
			} else {
				const subtotal = Number.parseFloat(
					(state.subtotal + dish.price * dish.quantity).toFixed(2),
				);

				return {
					dishes: [...state.dishes, dish],
					subtotal,
					totalItems: state.totalItems + dish.quantity,
				};
			}

			return state;
		}),
	removeFromOrder: (keyId, quantityToRemove) =>
		//@ts-ignore
		set((state) => {
			let updatedDishes = state.dishes.map((dish) => {
				if (dish.keyId === keyId) {
					const quantityLeft = Math.max(0, dish.quantity - quantityToRemove);

					// Restar el subtotal y el totalItems si la cantidad a eliminar es menor o igual al quantity del plato
					const amountToRemove = Math.min(dish.quantity, quantityToRemove);
					const subtotalChange = Number.parseFloat(
						(dish.price * amountToRemove).toFixed(2),
					);
					state.subtotal = Number.parseFloat(
						(state.subtotal - subtotalChange).toFixed(2),
					);
					state.totalItems -= amountToRemove;

					if (quantityLeft === 0) {
						// Si la cantidad restante es 0, eliminar completamente el plato de la orden
						return null; // Eliminar el plato de la lista
					} else {
						// Si la cantidad restante es mayor que 0, ajustar la cantidad del plato
						dish.quantity = quantityLeft;
						return dish;
					}
				}
				return dish;
			});

			// Filtrar los platos eliminados y asegurarnos de que solo se retornen DishType válidos
			updatedDishes = updatedDishes.filter(
				(dish): dish is DishType => dish !== null,
			);

			return {
				...state,
				dishes: updatedDishes,
			};
		}),

	clearOrder: () =>
		set((state) => ({
			...state,
			dishes: [],
			subtotal: 0,
			totalItems: 0,
		})),
}));
