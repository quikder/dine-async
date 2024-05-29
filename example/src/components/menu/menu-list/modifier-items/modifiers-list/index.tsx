import { t } from "i18next";
import { capitalize } from "lodash";
import type React from "react";
import { useState } from "react";
import { Chip, RadioButton, Text } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { useUpdateEffect } from "verity-quik";
import type { ModifierItemType, ModifierType } from "../../../types";
import { CheckItem } from "./check.item";
import { RadioItem } from "./radio.item";
import { Row, Section } from "./styled";

export const ModifierList: React.FC<Props> = ({
	modifier,
	selectedModifiers,
	setSelectedModifiers,
}) => {
	const {
		id,
		appLabel,
		isMandatory,
		singleSelection,
		maxSelections,
		modifierItems,
	} = modifier;
	const theme = useTheme();

	const [include, setInclude] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const colorChip = isMandatory
		? include
			? theme.colors.success
			: theme.colors.error
		: theme.colors.info;

	useUpdateEffect(() => {
		const isIncluded = selectedModifiers.findIndex(
			//@ts-ignore
			(item) => item.modifier.id === id,
		);

		if (isMandatory) {
			if (isIncluded >= 0) {
				setInclude(true);
			} else {
				setInclude(false);
			}
		}
	}, [selectedModifiers]);

	const handleModifierSelection = (selectedValue: string) => {
		setValue(selectedValue);

		const selectedModifierItem = modifierItems.find(
			(item: ModifierItemType) => item?.id === selectedValue,
		);

		const existingModifierItemIndex = selectedModifiers.findIndex(
			(item) => item.id === selectedModifierItem?.id,
		);

		const existingModifierGroupIndex = selectedModifiers.findIndex(
			(item) => item.modifier.id === selectedModifierItem?.modifier.id,
		);

		if (singleSelection) {
			if (existingModifierGroupIndex === -1) {
				//@ts-ignore
				setSelectedModifiers([...selectedModifiers, selectedModifierItem]);
			} else {
				const updatedModifiers = [...selectedModifiers];
				//@ts-ignore
				updatedModifiers[existingModifierGroupIndex] = selectedModifierItem;
				setSelectedModifiers(updatedModifiers);
			}
		} else {
			if (existingModifierItemIndex === -1) {
				//@ts-ignore
				setSelectedModifiers([...selectedModifiers, selectedModifierItem]);
			} else {
				setSelectedModifiers(
					selectedModifiers.filter((item) => item.id !== selectedValue),
				);
			}
		}
	};

	return (
		<Section>
			<Row>
				<Text variant="titleMedium">{capitalize(appLabel)}</Text>

				<Chip
					style={{
						borderRadius: 50,
						marginLeft: 10,
						backgroundColor: `${colorChip}`,
					}}
					textStyle={{ color: "#fff" }}
				>
					{isMandatory ? t("dine.mandatory") : t("dine.optional")}
				</Chip>
			</Row>

			{singleSelection ? (
				<RadioButton.Group
					onValueChange={(value) => handleModifierSelection(value)}
					value={value}
				>
					{modifierItems.map((item: ModifierItemType) => (
						<RadioItem key={item.id} {...item} />
					))}
				</RadioButton.Group>
			) : (
				<>
					{modifierItems.map((item: ModifierItemType) => (
						<CheckItem
							key={item.id}
							{...item}
							onPress={() => handleModifierSelection(`${item.id}`)}
							//@ts-ignore
							selectedModifiers={selectedModifiers}
							modifierGroup={modifier}
						/>
					))}
				</>
			)}
		</Section>
	);
};

interface Props {
	modifier: ModifierType;
	selectedModifiers: ModifierItemType[];
	setSelectedModifiers: React.Dispatch<
		React.SetStateAction<ModifierItemType[]>
	>;
}
