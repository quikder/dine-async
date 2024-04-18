import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { TakeOrder } from "../component/take-order";

export const TakeOrderScreen = () => {
	const { restaurantId } = useRoute<any>().params;

	return (
		<Layout title={t("dine.take-order")} useDrawer>
			<TakeOrder restaurantId={restaurantId} />
		</Layout>
	);
};
