import { t } from "i18next";
import type { FC } from "react";
import type { Control, UseFormWatch } from "react-hook-form";
import { TextInput } from "verity-quik";
import { DeliveryTypeInput } from "./delivery-type.input";
import type { FormType } from "./types";

interface Props {
	control: Control<FormType>;
    watch: UseFormWatch<FormType>
}

export const Form: FC<Props> = ({ control, watch }) => {
	return (
		<>
			<TextInput
				control={control}
				name="customerName"
				rules={{ required: t("dine.error.customerName") }}
				label={t("dine.customerName")}
			/>

			<DeliveryTypeInput control={control} />

			{watch("deliveryType") === "dine-in" && (
				<TextInput
					control={control}
					name="tableNumber"
					rules={{
						required: {
							value: true,
							message: t("dine.error.table"),
						},
						min: {
							value: 1,
							message: t("dine.error.table-min"),
						},
					}}
					label={t("dine.table-number")}
					useKeyboardAccesory
					keyboardType="numeric"
				/>
			)}
		</>
	);
};
