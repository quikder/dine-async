import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { AddDishes } from "../components/add-dishes";

export const AddDishesScreen = () => {
	const { restaurantId, orderId } = useRoute<any>().params;
	

	return (
		<Layout title={t("dine.add-dishes")} back customTop={-1}>
			<AddDishes restaurantId={restaurantId} orderId={orderId} />
		</Layout>
	);
};
