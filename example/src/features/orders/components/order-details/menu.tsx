import { MaterialIcons } from "@expo/vector-icons";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { type FC, useCallback, useRef, useState } from "react";
import { Appbar } from "react-native-paper";
import { Menu as PaperMenu } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { MailModal } from "../../../../components/mail-modal";
import { useCancelOrder } from "../../../../services/store/cancel-order";
import type { OrderType } from "../../types";
import { Charge } from "./charge";

interface Props {
	order: OrderType;
	restaurantId: string;
}

export const Menu: FC<Props> = ({ order }) => {
	const { navigate } = useNavigation<any>();
	const theme = useTheme();

	const { isPaid } = order;

	const [visible, setVisible] = useState<boolean>(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
		closeMenu();
	}, []);

	const [visibleMenuInvoice, setVisibleMenuInvoice] = useState<boolean>(false);
	const openMenuInvoice = () => setVisibleMenuInvoice(true);
	const closeMenuIvoice = () => {
		closeMenu();
		setVisibleMenuInvoice(false);
	};

	const [visibleMail, setVisibleMail] = useState<boolean>(false); //Mail

	const clearItems = useCancelOrder((state) => state.clearOrder);

	return (
		<>
			<PaperMenu
				visible={visible}
				onDismiss={closeMenu}
				anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
			>
				<PaperMenu.Item
					onPress={() => {
						navigate("AddDishesScreen", { orderId: order.id });
						closeMenu();
					}}
					title={t("dine.add-dishes")}
					leadingIcon="square-edit-outline"
				/>
				<PaperMenu.Item
					onPress={handlePresentModalPress}
					title={t("dine.charge")}
					leadingIcon="cash-register"
				/>

				<PaperMenu
					visible={visibleMenuInvoice}
					onDismiss={closeMenuIvoice}
					anchor={
						<PaperMenu.Item
							onPress={openMenuInvoice}
							title={t("dine.invoice")}
							leadingIcon="receipt"
						/>
					}
				>
					<PaperMenu.Item
						// onPress={() => printer("en")}
						title={t("dine.print")}
					/>

					<PaperMenu.Item
						onPress={() => {
							setVisibleMail(true);
							closeMenu();
							closeMenuIvoice();
						}}
						title={t("dine.mail")}
					/>
				</PaperMenu>

				<PaperMenu.Item
					onPress={() => {
						navigate("CancelScreen", { order });
						clearItems()
						closeMenu();
					}}
					title={isPaid ? t("dine.refund") : t("dine.cancel")}
					leadingIcon={({ size }) => (
						<MaterialIcons
							size={size}
							name="cancel-presentation"
							color={theme.colors.error}
						/>
					)}
					titleStyle={{ color: theme.colors.error }}
				/>
			</PaperMenu>

			<Charge order={order} bottomSheetModalRef={bottomSheetModalRef} />

			<MailModal
				visible={visibleMail}
				setVisible={setVisibleMail}
				order={order}
				usePortal
			/>
		</>
	);
};
