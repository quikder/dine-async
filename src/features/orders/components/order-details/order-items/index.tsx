import { t } from "i18next";
import { DataTable, Text } from "react-native-paper";
import type { OrderItemType, OrderType } from "../../../types";
import { Header } from "./header";
import { Item } from "./item";
import { Card, Subtitle } from "./styled";

export const OrderItems: React.FC<OrderType> = ({ items }) => {
	const itemGroup = items.reduce(
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
						<Text style={{ color: "#fff" }}>{t("takeout")}</Text>
					</Subtitle>
				)}

				{itemGroup.takeout.map((item) => (
					<Item key={item.id} {...item} />
				))}
			</DataTable>
		</Card>
	);
};

interface AccType {
	takeout: OrderItemType[];
	dinein: OrderItemType[];
}
