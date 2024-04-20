import { t } from "i18next";
import type { FC } from "react";
import { Text } from "react-native-paper";
import type { QrPayment } from "../../../orders/types";
import { Body, Img, ImgContent } from "./styled";

export const Qr: FC<QrPayment> = ({ qrCode }) => {
	const base64Icon = `data:image/png;base64,${qrCode}`;

	return (
		<Body>
			<Text variant="titleMedium" style={{ marginBottom: 5 }}>
				{t("dine.qr-pay.instrucions.title")}
			</Text>
			<Text style={{ marginBottom: 5 }}>
				{t("dine.qr-pay.instrucions.step1")}
			</Text>
			<Text style={{ marginBottom: 5 }}>
				{t("dine.qr-pay.instrucions.step2")}
			</Text>
			<Text>{t("dine.qr-pay.instrucions.step3")}</Text>

			<ImgContent>
				<Img transition={0} source={{ uri: base64Icon }} />
			</ImgContent>
		</Body>
	);
};
