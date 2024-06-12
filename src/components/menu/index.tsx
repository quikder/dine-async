import { useQuery } from "@apollo/client";
import { type FC, useState } from "react";
import { View } from "react-native";
import { ErrorServer, Loading } from "verity-quik";
import type { DeliveryItemType } from "../../features/take-orders/types";
import { ALL_DISHES } from "../../services/graphql/take-order/query";
import { CategoryList } from "./category-list";
import { MenuList } from "./menu-list";

interface Props {
	restaurantId: string;
	deliveryItemType: DeliveryItemType;
	isEdit?: boolean;
	// addDish: (newDish: NewDishType) => void;
}

export const Menu: FC<Props> = ({ restaurantId, deliveryItemType, isEdit }) => {
	const [categoryFilter, setCategoryFilter] = useState<string>("");

	const { loading, error, data, refetch } = useQuery(ALL_DISHES, {
		variables: {
			restaurantId: restaurantId,
		},
	});

	if (loading)
		return (
			<View style={{ flex: 1 }}>
				<Loading />
			</View>
		);

	if (error)
		return (
			<View style={{ flex: 1 }}>
				<ErrorServer error={error} refetch={refetch} />
			</View>
		);

	return (
		<>
			<CategoryList
				data={data?.allDishes}
				categoryFilter={categoryFilter}
				setCategoryFilter={setCategoryFilter}
			/>

			<MenuList
				dishes={data?.allDishes}
				categoryFilter={categoryFilter}
				deliveryItemType={deliveryItemType}
				isEdit={isEdit}
			/>
		</>
	);
};
