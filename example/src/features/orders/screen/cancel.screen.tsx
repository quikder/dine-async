import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { Cancel } from "../components/cancel/cancel";
import { Refund } from "../components/refund/refund";

export const CancelScreen = () => {
	const { order } = useRoute<any>().params;

	return (
		<Layout title={order.isPaid ? t("dine.refund") : t("dine.cancel")} back>
			{order.isPaid ? <Refund order={order} /> : <Cancel order={order} />}
		</Layout>
	);
};
