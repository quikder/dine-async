import type { FC } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { useWidth } from "verity-quik";
import type { DeliveryItemType } from "../../../features/take-orders/types";
import type { DishType } from "../types";
import { Item } from "./item";

interface Props {
	dishes: DishType[];
	categoryFilter: string;
	deliveryItemType: DeliveryItemType;
	// addDish: any;
	isEdit?: boolean;
}

export const MenuList: FC<Props> = ({
	dishes,
	categoryFilter,
	deliveryItemType,
	isEdit,
}) => {
	const { width } = useWindowDimensions();
	const menu = dishes ? dishes : [];

	const dishesFilter = menu.filter((item) =>
		item.category.id.includes(categoryFilter),
	);

	return (
		<>
			<FlatList
				data={dishesFilter}
				renderItem={({ item }) => (
					<Item
						dish={item}
						deliveryItemType={deliveryItemType}
						isEdit={isEdit}
					/>
				)}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				style={{ marginTop: 10 }}
				numColumns={useWidth(width, 2, 4, 5, 6, 10)}
				key={useWidth(width, 2, 4, 5, 6, 10)}
			/>
		</>
	);
};
