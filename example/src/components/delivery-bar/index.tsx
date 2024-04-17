import { t } from "i18next";
import {
    type Dispatch,
    type FC,
    type SetStateAction,
    useCallback,
    useRef,
} from "react";
import { IconButton } from "react-native-paper";
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
	const bottomSheetModalRef = useRef<null>(null);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef?.current;
	}, []);

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
		</Bar>
	);
};
