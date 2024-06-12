import { t } from "i18next";
import { DataTable } from "react-native-paper";

export const Header = () => {
	return (
		<DataTable.Header
			style={{
				borderBottomWidth: 0.5,
				borderBottomColor: "#ccc",
			}}
		>
			<DataTable.Title>{t("dine.dish")}</DataTable.Title>

			<DataTable.Title numeric>{t("dine.qty")}</DataTable.Title>

			<DataTable.Title numeric>{t("dine.delivered")}</DataTable.Title>
		</DataTable.Header>
	);
};
