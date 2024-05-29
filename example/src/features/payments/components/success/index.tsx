import LottieView from "lottie-react-native";
import { type FC, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import type { OrderType } from "../../../orders/types";
import { MenuInvoice } from "./menu-invoice";
import { Body, Content } from "./styled";

interface Props {
	change: number;
	order: OrderType;
}

export const Success: FC<Props> = () => {
	const { width } = useWindowDimensions();
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
					<MenuInvoice />
				)}
			</Content>
		</Body>
	);
};
