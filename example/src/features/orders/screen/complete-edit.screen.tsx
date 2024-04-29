import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Platform } from "react-native";
import { Layout } from "verity-quik";
import { CompleteEdit } from "../components/complete-edit";

export const CompleteEditScreen = () => {
	const { orderId } = useRoute<any>().params;
	return (
		<Layout
			title={t("dine.complete-edit")}
			back
			customTop={Platform.OS === "ios" ? -1 : 0}
		>
			<CompleteEdit orderId={orderId} />
		</Layout>
	);
};
