import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { Tables } from "../components/tables";

export const TableScreen = () => {
	const { restaurantId } = useRoute<any>().params;

	return (
		<Layout title={t("dine.tables")} useDrawer>
			<Tables restaurantId={restaurantId} />
		</Layout>
	);
};
