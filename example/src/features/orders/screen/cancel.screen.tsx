import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Text } from "react-native-paper";
import { Layout } from "verity-quik";
import { Cancel } from "../components/cancel/cancel";

export const CancelScreen = () => {
	const { order } = useRoute<any>().params;

	return (
		<Layout title={t("dine.cancel")} back>
			{order.isPaid ? <Text>Refound</Text> : <Cancel order={order} />}
		</Layout>
	);
};
