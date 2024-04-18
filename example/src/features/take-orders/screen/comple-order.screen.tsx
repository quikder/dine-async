import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout, ToastUi } from "verity-quik";
import { CompleteOrder } from "../../complete-order";

export const CompleteOrderScreen = () => {
	const { restaurantId, billSettings } = useRoute<any>().params;

	return (
		<Layout title={t("dine.complete-order")} back customTop={-1}>
			<ToastUi isModal />
			<CompleteOrder restaurantId={restaurantId} billStings={billSettings} />
		</Layout>
	);
};
