import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { Cash } from "../components/cash";

export const CashScreen = () => {
	const { order } = useRoute<any>().params;

	return (
		<Layout title={t("dine.charge-cash")} back>
			<Cash order={order} />
		</Layout>
	);
};
