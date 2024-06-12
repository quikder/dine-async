import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { Custom } from "../components/custom";

export const CustomScreen = () => {
	const { order } = useRoute<any>().params;
	return (
		<Layout title={t("dine.charge-custom")} back>
			<Custom order={order} />
		</Layout>
	);
};
