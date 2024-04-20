import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import moment, { type Moment } from "moment";
import { useState } from "react";
import { Layout, Searchbar } from "verity-quik";
import { List } from "../components/order/list";
import type { OrderStatusType } from "../types";

export const OrdersScreen = () => {
	const { restaurantId } = useRoute<any>().params;
	const [search, setSearch] = useState<string>("");
	const [date, setDate] = useState<Moment>(moment());
	const [orderStatus, setOrderStatus] = useState<OrderStatusType | "">("");
	const [paidStatus, setPaidStatus] = useState<boolean | "">("");

	return (
		<Layout title={t("dine.orders")} useDrawer>
			<Searchbar
				searchQuery={search}
				setSearchQuery={setSearch}
				placeholder={t("dine.search.order")}
			/>

			<List
				restaurantId={restaurantId}
				search={search}
				date={date}
				paidStatus={paidStatus}
				orderStatus={orderStatus}
			/>
		</Layout>
	);
};
