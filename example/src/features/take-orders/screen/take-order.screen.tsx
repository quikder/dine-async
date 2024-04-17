import { t } from "i18next";
import { Layout } from "verity-quik";
import { TakeOrder } from "../component/take-order";

export const TakeOrderScreen = () => {
	return (
		<Layout title={t("dine.take-order")} useDrawer>
			<TakeOrder />
		</Layout>
	);
};
