import { t } from "i18next";
import type { FC } from "react";
import { DataTable, Text } from "react-native-paper";
import type { OrderItemType } from "../../types";
import { Header } from "./header";
import { Item } from "./item";
import { Card, Subtitle } from "./styled";

interface AccType {
	takeout: OrderItemType[];
	dinein: OrderItemType[];
}

interface Props {
	orderItems: OrderItemType[];
}

export const OrderItems: FC<Props> = ({ orderItems }) => {
	const itemGroup = orderItems.reduce(
		(acc: AccType, curr: OrderItemType) => {
			if (curr.isForRestaurant) {
				acc.dinein.push(curr);
			} else {
				acc.takeout.push(curr);
			}
			return acc;
		},
		{ takeout: [], dinein: [] },
	);

	console.log(itemGroup);

	return (
		<Card>
			<Header />
			<DataTable>
				{itemGroup.dinein.length > 0 && itemGroup.takeout.length > 0 && (
					<Subtitle>
						<Text style={{ color: "#fff" }}>{t("dine.dine-in")}</Text>
					</Subtitle>
				)}

				{itemGroup.dinein.map((item) => (
					<Item key={item.id} {...item} />
				))}

				{/* TAKEOUT */}
				{itemGroup.dinein.length > 0 && itemGroup.takeout.length > 0 && (
					<Subtitle>
						<Text style={{ color: "#fff" }}>{t("dine.takeout")}</Text>
					</Subtitle>
				)}

				{itemGroup.takeout.map((item) => (
					<Item key={item.id} {...item} />
				))}
			</DataTable>
		</Card>
	);
};
