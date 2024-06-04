import { t } from "i18next";
import LottieView from "lottie-react-native";
import { type FC, Fragment, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import type { OrderType } from "../../../orders/types";
import { MenuInvoice } from "./menu-invoice";
import { Body, Content } from "./styled";

interface Props {
	change: number;
	order: OrderType;
}

export const Success: FC<Props> = ({ change, order }) => {
	const [animation, setAnimation] = useState(true);
	

	useEffect(() => {
		if (animation) {
			setTimeout(() => {
				setAnimation(false);
			}, 2000);
		}
	}, [animation]);

	return (
		<Body>
			<Content>
				{animation ? (
					<LottieView
						autoPlay
						loop={false}
						source={{
							uri: "https://lottie.host/f74395a1-1ee0-4a5e-ac43-2aa75ffc327f/fH7AMvwGQJ.json",
						}}
						style={{ width: "100%", height: "100%" }}
					/>
				) : (
					<Fragment>
						<View style={{ marginBottom: 16 }}>
							<Text variant="headlineSmall" style={{ textAlign: "center" }}>
								{t("dine.change")} ${change}
							</Text>
							<Text variant="bodyMedium" style={{ textAlign: "center" }}>
								{t("dine.of")} $
								{Number.parseFloat(
									order.financialDetails.totalRestaurant,
								).toFixed(2)}
							</Text>
						</View>
						<MenuInvoice order={order} />
					</Fragment>
				)}
			</Content>
		</Body>
	);
};
