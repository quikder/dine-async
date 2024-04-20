import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { Layout } from "verity-quik";
import { Qr } from "../components/qr";

export const QrScreen = () => {
	const { order } = useRoute<any>().params;
	console.log(order);

	return <Layout title={t("dine.charge-qr")} back>
        <Qr qrCode={order?.qrPayment?.qrCode} />
    </Layout>;
};
