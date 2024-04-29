import { useMutation } from "@apollo/client";
import { t } from "i18next";
import type React from "react";
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { CHANGE_ORDER_STATUS } from "../../../../../services/graphql/orders/mutation";
import type { OrderStatusType } from "../../../types";
import { Body, Card, Line, LineProgress, LineRow, Point, Row } from "./styled";

export const Status: React.FC<Props> = ({ orderId, status }) => {
	const theme = useTheme();
	const [progress, setProgress] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(progress, {
					toValue: 5,
					duration: 2000,
					useNativeDriver: false,
				}),
			]),
		).start();
	}, []);

	const start =
		status === "DELIVERED" ? "100%" : status === "READY" ? "50%" : "0%";
	const end =
		status === "DELIVERED" ? "100%" : status === "READY" ? "100%" : "50%";

	const progressAnimation = progress.interpolate({
		inputRange: [0, 5],
		outputRange: [start, end],
	});

	const [change] = useMutation(CHANGE_ORDER_STATUS);
	return (
		<Card>
			<Text variant="titleSmall">{t("dine.order-status")}</Text>

			{status !== "CANCELLED" ? (
				<Body>
					<Row>
						<Text variant="labelSmall">{t("dine.new")}</Text>
						<Text variant="labelSmall">{t("dine.ready")}</Text>
						<Text variant="labelSmall">{t("dine.delivered")}</Text>
					</Row>

					<LineRow>
						<Point
							$bg={
								status === "DELIVERED" || status === "READY" || status === "NEW"
							}
							disabled
						/>

						<Point
							$bg={status === "DELIVERED" || status === "READY"}
							onPress={() =>
								change({
									variables: {
										orderId,
										status: "ready",
									},
								})
							}
							disabled={status === "DELIVERED" || status === "READY"}
						/>

						<Point
							$bg={status === "DELIVERED"}
							onPress={() =>
								change({
									variables: {
										orderId,
										status: "delivered",
									},
								})
							}
							disabled={status === "DELIVERED"}
						/>

						<Line>
							<LineProgress
								style={{
									width: progressAnimation,
								}}
							/>
						</Line>
					</LineRow>
				</Body>
			) : (
				<Text style={{ color: theme.colors.error }}>{t("dine.canceled")}</Text>
			)}

			<Divider style={{ marginTop: 5 }} />
		</Card>
	);
};

interface Props {
	orderId: string;
	status: OrderStatusType;
}
