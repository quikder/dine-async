import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import type { OrderType } from "../../../types";
import { Item } from "./item";
import { Body, Content, Header, MethodContent, TitleContent } from "./styled";

export const Charge: React.FC<Props> = ({ order, bottomSheetModalRef }) => {
	const bg = useTheme().colors.background;
	const { navigate } = useNavigation<any>();
	const { width } = useWindowDimensions();

	const snapPoints = useMemo(() => ["50%", "50%"], []);

	const handleCloseSheet = () => {
		bottomSheetModalRef?.current?.close();
	};

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				pressBehavior="none"
			/>
		),
		[],
	);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				handleComponent={null}
				backgroundStyle={{
					backgroundColor: "#00000000",
				}}
			>
				<Body>
					<Content $width={width} $bg={bg}>
						<Header>
							<IconButton icon="close" onPress={handleCloseSheet} />

							<TitleContent>
								<Text variant="titleMedium" style={{ textAlign: "center" }}>
									{t("dine.select.charge-method")}
								</Text>
							</TitleContent>
						</Header>

						<Text
							variant="bodyLarge"
							style={{ textAlign: "center", marginTop: -20 }}
						>
							{t("dine.total")}{" "}
							<Text style={{ fontWeight: "600" }}>
								${order.financialDetails.totalRestaurant}
							</Text>
						</Text>

						<MethodContent>
							<Item
								icon={
									<Ionicons name="cash-outline" size={55} color="#adadad" />
								}
								text={t("dine.charge-cash")}
								onPress={() => {
									navigate("PaymentNavigation", {
										order,
										screen: "CashScreen",
										params: { order },
									});
									handleCloseSheet();
								}}
							/>

							<Item
								icon={<AntDesign name="qrcode" size={55} color="#adadad" />}
								text={t("dine.charge-qr")}
								onPress={() => {
									navigate("PaymentNavigation", {
										order,
										screen: "QrScreen",
										params: { order },
									});
									handleCloseSheet();
								}}
							/>

							<Item
								icon={
									<FontAwesome5
										name="cash-register"
										size={55}
										color="#adadad"
									/>
								}
								text={t("dine.charge-custom")}
								onPress={() => {
									navigate("PaymentNavigation", {
										order,
										screen: "CustomScreen",
										params: { order },
									});
									handleCloseSheet();
								}}
							/>
						</MethodContent>
					</Content>
				</Body>
			</BottomSheetModal>
		</>
	);
};

interface Props {
	order: OrderType;
	bottomSheetModalRef: any;
}
