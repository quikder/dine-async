import RNDateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { t } from "i18next";
import type { Moment } from "moment";
import moment from "moment";
import type React from "react";
import type { FC } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Divider, Portal, Text, TextInput } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { SegmentControl } from "verity-quik";
import type { OrderStatusType } from "../../../types";
import { Content, ModalBody, Press } from "./styled";

export const Filter: FC<Props> = ({
	isVisible,
	hideModal,
	date,
	setDate,
	isEmployee,
	minDate,
	orderStatus,
	setOrderStatus,
	paidStatus,
	setPaidStatus,
}) => {
	const { width } = useWindowDimensions();
	const theme = useTheme();
	const beforeYesterday = moment().subtract(1, "days");

	// Pickder date andorid
	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate;
		setDate(moment(currentDate));
	};
	const showMode = () => {
		DateTimePickerAndroid.open({
			value: date.toDate(),
			onChange,
			mode: "date",
			minimumDate: isEmployee ? beforeYesterday.toDate() : minDate.toDate(),
			maximumDate: new Date(),
			positiveButton: {
				label: t("accept"),
			},
			negativeButton: {
				label: t("cancel"),
				textColor: theme.colors.error,
			},
		});
	};

	const showDatepicker = () => {
		showMode();
	};

	return (
		<Portal>
			<ModalBody $width={width} visible={isVisible} onDismiss={hideModal}>
				<Text variant="titleLarge">{t("dine.filter-orders")}</Text>

				<Text variant="titleMedium">{t("dine.date")}</Text>

				{Platform.OS === "ios" ? (
					<RNDateTimePicker
						value={date.toDate()}
						onChange={(event, date) => setDate(moment(date))}
						minimumDate={
							isEmployee ? beforeYesterday.toDate() : minDate.toDate()
						}
						maximumDate={new Date()}
						themeVariant={theme.mode}
					/>
				) : (
					<Content>
						<TextInput
							mode="outlined"
							value={date.format("MM/DD/YYYY")}
							editable={false}
						/>
						<Press onPress={showDatepicker} />
					</Content>
				)}
				<Divider style={{ marginVertical: 10 }} />

				<Text variant="titleMedium">{t("dine.order-status")}</Text>

				<SegmentControl
					segments={[
						t("dine.all"),
						t("dine.new"),
						t("dine.ready"),
						t("dine.delivered"),
						t("dine.canceled"),
					]}
					onChange={(index: number) => {
						setOrderStatus(
							index === 0
								? ""
								: index === 1
									? "NEW"
									: index === 2
										? "READY"
										: index === 3
											? "DELIVERED"
											: "CANCELLED",
						);
					}}
					value={
						orderStatus === ""
							? 0
							: orderStatus === "NEW"
								? 1
								: orderStatus === "READY"
									? 2
									: orderStatus === "DELIVERED"
										? 3
										: 4
					}
				/>

				<Divider style={{ marginVertical: 10 }} />

				<Text variant="titleMedium">{t("dine.paid-status")}</Text>

				<SegmentControl
					segments={[t("dine.all"), t("dine.paid"), t("dine.no-paid")]}
					value={paidStatus === "" ? 0 : paidStatus ? 1 : 2}
					onChange={(index: number) => {
						setPaidStatus(index === 0 ? "" : index === 1);
					}}
				/>
			</ModalBody>
		</Portal>
	);
};

interface Props {
	isVisible: boolean;
	hideModal: () => void;
	date: Moment;
	setDate: React.Dispatch<React.SetStateAction<Moment>>;
	isEmployee?: boolean;
	minDate: Moment;
	orderStatus: OrderStatusType | "";
	setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatusType | "">>;
	paidStatus: boolean | "";
	setPaidStatus: React.Dispatch<React.SetStateAction<boolean | "">>;
}
