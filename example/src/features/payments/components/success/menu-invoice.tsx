import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { type FC, useState } from "react";
import { Button } from "verity-quik";
import { MailModal } from "../../../../components/mail-modal";
import type { OrderType } from "../../../orders/types";

interface Props {
	order: OrderType;
}

export const MenuInvoice: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();

	const containerStyle = { backgroundColor: "white", padding: 20 };
	const [visibleMail, setVisibleMail] = useState<boolean>(false); //Mail

	return (
		<>
			<Button
				onPress={() => navigate("OrdersScreen")}
				style={{ marginBottom: 16 }}
			>
				{t("dine.print")}
			</Button>

			<Button onPress={() => setVisibleMail(true)} style={{ marginBottom: 16 }}>
				{t("dine.mail")}
			</Button>

			<Button onPress={() => navigate("OrdersScreen")}>
				{t("without-invoice")}
			</Button>

			<MailModal
				visible={visibleMail}
				setVisible={setVisibleMail}
				order={order}
			/>
		</>
	);
};
