import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Platform } from "react-native";
import { Layout } from "verity-quik";
import { AddDishes } from "../components/add-dishes";

export const AddDishesScreen = () => {
	const { restaurantId, orderId } = useRoute<any>().params;

	return (
		<Layout
			title={t("dine.add-dishes")}
			back
			customTop={Platform.OS === "ios" ? -1 : 0}
		>
			<AddDishes restaurantId={restaurantId} orderId={orderId} />
		</Layout>
	);
};
