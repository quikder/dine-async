import { t } from "i18next";
import type React from "react";
import type { Control } from "react-hook-form";
import { Picker } from "verity-quik";
import type { FormType } from "./types";

export const DeliveryTypeInput: React.FC<Props> = ({ control }) => {
	return (
		<Picker
			control={control}
			name="deliveryType"
			rules={{
				required: t("dine.error.deliveryType"),
			}}
			items={itemsDelivery}
			placeholder={t("dine.deliveryType")}
		/>
	);
};

const itemsDelivery = [
	{
		label: t("dine.dine-in"),
		value: "dine-in",
	},
	{
		label: t("dine.takeout"),
		value: "takeout",
	},
	{
		label: t("dine.pickup"),
		value: "pickup",
	},
	{
		label: t("dine.delivery"),
		value: "delivery",
	},
];

interface Props {
	control: Control<FormType>;
}
