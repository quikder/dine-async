import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { type FC, useState } from "react";
import { ContextMenuButton } from "react-native-ios-context-menu";
import { Appbar } from "react-native-paper";
import { MailModal } from "../../../../components/mail-modal";
import type { OrderType } from "../../types";

interface Props {
	order: OrderType;
}

export const Menu: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();
	const [visibleMail, setVisibleMail] = useState<boolean>(false); //Mail

	const { status, isPaid } = order;

	const actions = (actionKey: string) => {
		switch (actionKey) {
			case "add-dishes":
				navigate("AddDishesScreen", { orderId: order.id });
				break;

			case "charge-tap-to-pay":
				isPaid
					? () => {}
					: navigate("PaymentNavigation", {
							order,
							screen: "TapToPayScreen",
							params: { order },
						});
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
				break;

			case "invoice-mail":
				setVisibleMail(true);
				break;

			case "refund-cancel":
				navigate("CancelScreen", { order });
				break;

			default:
				break;
		}
	};
	// const [visible, setVisible] = useState<boolean>(false);
	// const openMenu = () => setVisible(true);
	// const closeMenu = () => setVisible(false);

	return (
		<>
			<ContextMenuButton
				menuConfig={{
					menuTitle: "",
					menuPreferredElementSize: "medium",
					menuItems: [
						// Add DISHES
						{
							actionKey: "add-dishes",
							actionTitle: t("dine.add-dishes"),
							menuAttributes:
								isPaid || status === "CANCELLED" ? ["hidden"] : [],
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
							menuOptions: ["displayInline"],
							icon: {
								type: "IMAGE_SYSTEM",
								imageValue: {
									systemName: "creditcard.fill",
									scale: "large",
								},
							},
							menuItems: [
								{
									actionKey: "charge-tap-to-pay",
									actionTitle: "Tap to pay",
									menuAttributes:
										isPaid || status === "CANCELLED" ? ["hidden"] : [],
									icon: {
										type: "IMAGE_SYSTEM",
										imageValue: {
											systemName: "wave.3.right.circle.fill",
											scale: "large",
										},
									},
								},
								{
									actionKey: "charge-cash",
									actionTitle: t("dine.charge-cash"),
									menuAttributes:
										isPaid || status === "CANCELLED" ? ["hidden"] : [],
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
									menuAttributes:
										isPaid || status === "CANCELLED" ? ["hidden"] : [],
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
									menuAttributes:
										isPaid || status === "CANCELLED" ? ["hidden"] : [],
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
							menuOptions: ["displayInline"],
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
									menuAttributes: status === "CANCELLED" ? ["hidden"] : [],
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
									menuAttributes: status === "CANCELLED" ? ["hidden"] : [],
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
							menuAttributes:
								status === "CANCELLED" ? ["hidden"] : ["destructive"],
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
			>
				<Appbar.Action icon="dots-vertical" />

				<MailModal
					visible={visibleMail}
					setVisible={setVisibleMail}
					order={order}
					usePortal
				/>
			</ContextMenuButton>
		</>
	);
};
