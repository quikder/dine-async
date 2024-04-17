import { t } from "i18next";
import type { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, View } from "react-native";
import type { DishType } from "../types";
import { Item } from "./item";

interface Props {
	data: DishType[];
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
}

export const CategoryList: FC<Props> = ({
	data,
	categoryFilter,
	setCategoryFilter,
}) => {
	const categories = data ? getUniqueListBy(data) : [];

	return (
		<View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Item
					id=""
					name={t("dine.all")}
					categoryFilter={categoryFilter}
					setCategoryFilter={setCategoryFilter}
				/>
				{categories.map((item) => (
					<Item
						key={item.id}
						{...item.category}
						categoryFilter={categoryFilter}
						setCategoryFilter={setCategoryFilter}
					/>
				))}
			</ScrollView>
		</View>
	);
};

function getUniqueListBy(arr: DishType[]) {
	return [
		...new Map(arr.map((item: DishType) => [item.category.id, item])).values(),
	];
}
