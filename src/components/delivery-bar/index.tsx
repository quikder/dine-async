import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { t } from "i18next";
import {
	type Dispatch,
	type FC,
	type SetStateAction,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { IconButton, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { SegmentControl } from "verity-quik";
import type { DeliveryItemType } from "../../features/take-orders/types";
import { Bar, Content } from "./styled";

interface Props {
	deliveryItemType: DeliveryItemType;
	setDeliveryItemType: Dispatch<SetStateAction<DeliveryItemType>>;
}

export const DeliveryBar: FC<Props> = ({
	deliveryItemType,
	setDeliveryItemType,
}) => {
	const theme = useTheme();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => [160, 160], []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				pressBehavior="close"
			/>
		),
		[],
	);

	return (
		<Bar>
			<Content>
				<SegmentControl
					segments={[t("dine.dine-in"), t("dine.takeout")]}
					onChange={(index: number) => {
						setDeliveryItemType(index === 0 ? "dine-in" : "takeout");
					}}
					value={deliveryItemType === "dine-in" ? 0 : 1}
					style={{ backgroundColor: "transparent" }}
				/>
			</Content>
			<IconButton icon="information" onPress={handlePresentModalPress} />

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
			>
				<BottomSheetView style={{ padding: 10 }}>
					<Text>{t("dine.delivery-dish")}</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</Bar>
	);
};
