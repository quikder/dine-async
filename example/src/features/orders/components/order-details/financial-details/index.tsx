import { t } from "i18next";
import type React from "react";
import { Text } from "react-native-paper";
import type { FinancialDetailsType } from "../../../types";
import { Content, TextContainer } from "./styled";

export const FinancialDetails: React.FC<Props> = ({
	subtotal,
	tax,
	tip,
	totalOrder,
	totalRestaurant,
	isEmployee,
}) => {
	return (
		<Content>
			<TextContainer>
				<Text variant="titleMedium">{t("dine.subtotal")}:</Text>
				<Text variant="bodyLarge">${toDecimal(subtotal)}</Text>
			</TextContainer>

			<TextContainer>
				<Text variant="titleMedium">{t("dine.tax")}:</Text>
				<Text variant="bodyLarge">${toDecimal(tax)}</Text>
			</TextContainer>

			{!isEmployee && (
				<TextContainer>
					<Text variant="titleMedium">{t("dine.tip")}:</Text>
					<Text variant="bodyLarge">${toDecimal(tip)}</Text>
				</TextContainer>
			)}

			<TextContainer>
				<Text variant="titleMedium">{t("dine.total")}:</Text>
				<Text variant="bodyLarge">${toDecimal(totalOrder)}</Text>
			</TextContainer>

			{!isEmployee && (
				<TextContainer>
					<Text variant="titleMedium">{t("dine.total-tip")}:</Text>
					<Text variant="bodyLarge">${toDecimal(totalRestaurant)}</Text>
				</TextContainer>
			)}
		</Content>
	);
};

const toDecimal = (number: string) => {
	return Number.parseFloat(number).toFixed(2);
};

interface Props extends FinancialDetailsType {
	isEmployee?: boolean;
}
