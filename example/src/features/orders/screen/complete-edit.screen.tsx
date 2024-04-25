import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { CompleteEdit } from "../components/complete-edit";

export const CompleteEditScreen = () => {
	const { orderId } = useRoute<any>().params;
	return (
		<Layout title={t("dine.complete-edit")} back customTop={-1}>
			<CompleteEdit orderId={orderId} />
		</Layout>
	);
};
