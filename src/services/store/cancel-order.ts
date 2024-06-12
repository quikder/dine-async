import { create } from "zustand";

export interface DishType {
	id: string;
	quantity: number;
	price: number;
}

interface OrderState {
	dishes: DishType[];
	total: number;
	addToCancel: (dish: DishType) => void;
	removeFromCancel: (keyId: string, quantity: number) => void;
	clearOrder: () => void;
}

export const useCancelOrder = create<OrderState>((set) => ({
	dishes: [],
	total: 0,
	addToCancel: (dish) =>
		set((state) => {
			const existingDishIndex = state.dishes.findIndex(
				(existingDish) => existingDish.id === dish.id,
			);

			if (existingDishIndex !== -1) {
				const updatedDishes = [...state.dishes];
				const existingDish = updatedDishes[existingDishIndex];

				if (existingDish) {
					existingDish.quantity += dish.quantity;

					const total = Number.parseFloat(
						(state.total + dish.price * dish.quantity).toFixed(2),
					);

					return {
						dishes: updatedDishes,
						total,
					};
				}
			} else {
				const total = Number.parseFloat(
					(state.total + dish.price * dish.quantity).toFixed(2),
				);

				return {
					dishes: [...state.dishes, dish],
					total,
				};
			}

			return state;
		}),
	removeFromCancel: (id, quantityToRemove) =>
		//@ts-ignore
		set((state) => {
			let updatedDishes = state.dishes.map((dish) => {
				if (dish.id === id) {
					const quantityLeft = Math.max(0, dish.quantity - quantityToRemove);

					const amountToRemove = Math.min(dish.quantity, quantityToRemove);
					const subtotalChange = Number.parseFloat(
						(dish.price * amountToRemove).toFixed(2),
					);
					state.total = Number.parseFloat(
						(state.total - subtotalChange).toFixed(2),
					);

					if (quantityLeft === 0) {
						return null;
					} else {
						dish.quantity = quantityLeft;
						return dish;
					}
				}
				return dish;
			});

			updatedDishes = updatedDishes.filter(
				(dish): dish is DishType => dish !== null,
			);

			return {
				...state,
				dishes: updatedDishes,
			};
		}),

	clearOrder: () => set({ dishes: [], total: 0 }),
}));
