import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { Button } from "verity-quik";

export const MenuInvoice = () => {
	const { navigate } = useNavigation<any>();
	return (
		<>
			<Button onPress={() => navigate("OrdersScreen")}>
				{t("without-invoice")}
			</Button>
		</>
	);
};
