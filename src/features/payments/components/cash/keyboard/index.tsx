import type { FC } from "react";
import { type Control, Controller } from "react-hook-form";
import type { FormType } from "../types";
import { Key } from "./key";
import { Body } from "./styled";

interface Props {
	control: Control<FormType>;
}

export const Keyboard: FC<Props> = ({ control }) => {
	return (
		<>
			<Controller
				name="amount"
				control={control}
				render={({ field: { value, onChange } }) => {
					return (
						<Body>
							{["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map(
								(item) => (
									<Key
										key={item}
										value={item}
										onPress={() => onChange(formatAmount(`${value} + ${item}`))}
									/>
								),
							)}
							<Key
								useIcon
								onPress={() =>
									onChange(formatAmount(value.slice(0, -1)))
								}
							/>
						</Body>
					);
				}}
			/>
		</>
	);
};

const formatAmount = (value: string) => {
	const cleanedValue = value.replace(/[^0-9]/g, "");

	const cents = cleanedValue.slice(-2);
	let dollars = cleanedValue.slice(0, -2);

	if (dollars === "") {
		dollars = "0";
	}

	return `${Number.parseInt(dollars, 10)}.${cents}`;
};
