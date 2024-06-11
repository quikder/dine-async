import { t } from "i18next";
import { DataTable } from "react-native-paper";

export const Header = () => {
	return (
		<DataTable.Header>
			<DataTable.Title>{t("dine.customerName")}</DataTable.Title>
			<DataTable.Title numeric>{t("dine.table-for-number")}</DataTable.Title>
			<DataTable.Title numeric>{t("dine.ready")}</DataTable.Title>
		</DataTable.Header>
	);
};
