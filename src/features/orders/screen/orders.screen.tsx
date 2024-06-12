import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import moment, { type Moment } from "moment";
import { useState } from "react";
import { Layout, Searchbar } from "verity-quik";
import { Filter } from "../components/order/filter";
import { List } from "../components/order/list";
import type { OrderStatusType } from "../types";

export const OrdersScreen = () => {
	const { restaurantId, isEmployee } = useRoute<any>().params;
	const [filterVisible, setFilterVisible] = useState<boolean>(false);

	const [search, setSearch] = useState<string>("");
	const [date, setDate] = useState<Moment>(moment());
	const [orderStatus, setOrderStatus] = useState<OrderStatusType | "">("");
	const [paidStatus, setPaidStatus] = useState<boolean | "">("");

	return (
		<Layout
			title={t("dine.orders")}
			useDrawer
			action="filter"
			onPressAction={() => setFilterVisible(true)}
		>
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

			<Filter
				isVisible={filterVisible}
				hideModal={() => setFilterVisible(false)}
				date={date}
				orderStatus={orderStatus}
				paidStatus={paidStatus}
				setDate={setDate}
				setOrderStatus={setOrderStatus}
				setPaidStatus={setPaidStatus}
				minDate={moment()}
				isEmployee={isEmployee}
			/>
		</Layout>
	);
};
