import { Foundation } from "@expo/vector-icons";
import { t } from "i18next";
import { DataTable, Text } from "react-native-paper";
import type { PaymentType } from "../../../types";
import { Colum, Icon, Row } from "./styled";

export const CashMethod: React.FC<PaymentType> = ({ cashPayment }) => {
	console.log(cashPayment);
	
	return (
		<>
			<Text variant="titleSmall">{t("dine.cash")}</Text>

			<DataTable>
				<Row>
					<Icon />

					<DataTable.Header style={{ borderBottomWidth: 0 }}>
						<DataTable.Title>{t("dine.amount")}</DataTable.Title>
						<DataTable.Title>{t("dine.change")}</DataTable.Title>
					</DataTable.Header>
				</Row>

				<Row>
					<Icon>
						<Foundation name="dollar-bill" size={35} />
					</Icon>

					<Colum>
						<DataTable.Row>
							<DataTable.Cell>${cashPayment.amount}</DataTable.Cell>
							<DataTable.Cell>${cashPayment.change}</DataTable.Cell>
						</DataTable.Row>
					</Colum>
				</Row>
			</DataTable>
		</>
	);
};
