import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { type FC, useState } from "react";
import { View } from "react-native";
import { ContextMenuView } from "react-native-ios-context-menu";
import { DataTable, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { MailModal } from "../../../../../components/mail-modal";
import type { OrderType } from "../../../types";
import { Body, Cell, Row } from "./styled";

interface Props {
	order: OrderType;
}

export const Item: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();
	const [visibleMail, setVisibleMail] = useState<boolean>(false); //Mail

	const actions = (actionKey: string) => {
		switch (actionKey) {
			case "add-dishes":
				console.log("Anadir plato");
				break;

			case "charge-cash":
				isPaid
					? () => {}
					: navigate("PaymentNavigation", {
							order,
							screen: "CashScreen",
							params: { order },
						});
				break;

			case "charge-qr":
				isPaid
					? () => {}
					: navigate("PaymentNavigation", {
							order,
							screen: "QrScreen",
							params: { order },
						});
				break;

			case "charge-custom":
				isPaid
					? () => {}
					: navigate("PaymentNavigation", {
							order,
							screen: "CustomScreen",
							params: { order },
						});
				break;

			case "invoice-print":
				console.log("Imprimir factura");
				break;

			case "invoice-mail":
				setVisibleMail(true);
				break;

			case "refund-cancel":
				console.log("Cancelar orden");
				break;

			default:
				break;
		}
	};

	const {
		status,
		customerName,
		deliveryType,
		tableNumber,
		financialDetails,
		isPaid,
	} = order;

	const theme = useTheme();

	return (
		<>
			<ContextMenuView
				menuConfig={{
					menuTitle: "",
					menuPreferredElementSize: "medium",
					menuItems: [
						// Add DISHES
						{
							actionKey: "add-dishes",
							actionTitle: t("dine.add-dishes"),
							icon: {
								type: "IMAGE_SYSTEM",
								imageValue: {
									systemName: "plus.circle.fill",
									scale: "large",
								},
							},
						},
						// CHARGE
						{
							actionKey: "charge",
							menuTitle: t("dine.charge"),
							menuPreferredElementSize: "medium",
							icon: {
								type: "IMAGE_SYSTEM",
								imageValue: {
									systemName: "creditcard.fill",
									scale: "large",
								},
							},
							menuItems: [
								{
									actionKey: "charge-cash",
									actionTitle: t("dine.charge-cash"),
									menuAttributes: isPaid ? ["hidden"] : [],
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "dollarsign.circle.fill",
											scale: "large",
										},
									},
								},
								{
									actionKey: "charge-qr",
									actionTitle: t("dine.charge-qr"),
									menuAttributes: isPaid ? ["hidden"] : [],
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "qrcode",
											scale: "large",
										},
									},
								},
								{
									actionKey: "charge-custom",
									actionTitle: t("dine.charge-custom"),
									menuAttributes: isPaid ? ["hidden"] : [],
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "dollarsign.square.fill",
											scale: "large",
										},
									},
								},
							],
						},
						//INVOICE
						{
							actionKey: "invoice",
							menuTitle: t("dine.invoice"),
							menuPreferredElementSize: "medium",
							icon: {
								type: "IMAGE_SYSTEM",
								imageValue: {
									systemName: "doc.text.fill",
									scale: "large",
								},
							},
							menuItems: [
								{
									actionKey: "invoice-print",
									actionTitle: t("dine.print"),
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "printer",
											scale: "large",
										},
									},
								},
								{
									actionKey: "invoice-mail",
									actionTitle: t("dine.mail"),
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "envelope",
											scale: "large",
										},
									},
								},
							],
						},
						//REFUND
						{
							actionKey: "refund-cancel",
							actionTitle: isPaid ? t("dine.refund") : t("dine.cancel"),
							menuAttributes: ["destructive"],
							icon: {
								type: "IMAGE_SYSTEM",
								imageValue: {
									systemName: isPaid ? "banknote.fill" : "xmark.circle.fill",
									scale: "large",
								},
							},
						},
					],
				}}
				onPressMenuItem={({ nativeEvent }) => actions(nativeEvent.actionKey)}
				previewConfig={{
					previewType: "CUSTOM",
					previewSize: "STRETCH",
					backgroundColor: theme.colors.background,
				}}
				renderPreview={() => (
					<View>
						<Text>Custom Menu Preview</Text>
					</View>
				)}
			>
				<Body>
					<Row $status={status}>
						<Cell>{customerName}</Cell>

						<Cell numeric>
							{deliveryType === "TAKEOUT"
								? t("dine.takeout")
								: deliveryType === "PICKUP"
									? t("dine.pickup")
									: deliveryType === "DELIVERY"
										? t("dine.delivery")
										: tableNumber}
						</Cell>

						<DataTable.Cell
							numeric
							textStyle={{
								color: isPaid ? theme.colors.success : theme.colors.error,
							}}
						>
							$
							{
								//@ts-ignore
								Number.parseFloat(financialDetails.totalRestaurant).toFixed(2)
							}
						</DataTable.Cell>
					</Row>
				</Body>
			</ContextMenuView>

			<MailModal visible={visibleMail} setVisible={setVisibleMail} order={order} />
		</>
	);
};
