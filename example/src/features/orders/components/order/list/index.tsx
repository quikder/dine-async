import { useQuery } from "@apollo/client";
import { useRefresh } from "@react-native-community/hooks";
import { t } from "i18next";
import { lowerCase } from "lodash";
import type { Moment } from "moment";
import moment from "moment";
import type { FC } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Empty, ErrorServer, Loading } from "verity-quik";
import { ALL_ORDERS } from "../../../../../services/graphql/orders/query";
import type { OrderStatusType, OrderType } from "../../../types";
import { Item } from "../item";

interface Props {
	restaurantId: string;
	search: string;
	date: Moment;
	paidStatus: boolean | "";
	orderStatus: OrderStatusType | "";
	isEmployee: boolean
}

export const List: FC<Props> = ({
	restaurantId,
	search,
	date,
	paidStatus,
	orderStatus,
	isEmployee,
}) => {
	const { loading, error, data, refetch } = useQuery(ALL_ORDERS, {
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-and-network",
		variables: {
			restaurantId,
			date: date.format("YYYY-MM-DD"),
		},
	});

	const fetch = async () => {
		try {
			await refetch();
		} catch (error) {
			console.error("Error al refrescar los datos:", error);
		}
	};

	const { isRefreshing, onRefresh } = useRefresh(fetch);

	if (loading && data === undefined)
		return (
			<View style={{ marginTop: 16 }}>
				<Loading />
			</View>
		);

	if (error) return <ErrorServer error={error} refetch={refetch} />;

	const filteredAndSortedOrder = () => {
		if (!data) return [];
		const filteredOrders: OrderType[] = data.allOrders.filter(
			(item: OrderType) => {
				return paidStatus !== ""
					? item.isPaid === paidStatus && item.status.includes(orderStatus)
					: item.status.includes(orderStatus);
			},
		);
		return filteredOrders.sort((a, b) =>
			moment(b.createdAt).diff(moment(a.createdAt)),
		);
	};

	const IS_NUMBER = /^[0-9]+$/.test(search);
	const displayData = filteredAndSortedOrder().filter((item: any) => {
		if (IS_NUMBER) {
			return item.tableNumber === Number.parseInt(search);
		}

		return lowerCase(item.customerName).includes(lowerCase(search));
	});

	return (
		<DataTable style={{ flex: 1, marginTop: 16 }}>
			<FlatList
				data={displayData}
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <Item order={item} isEmployee={isEmployee} restaurantId={restaurantId} />}
				keyExtractor={(item: OrderType) => item.id}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						tintColor="#999999"
					/>
				}
				ListEmptyComponent={
					<Empty
						isEmpty={displayData.length === 0}
						emptyText={
							date.startOf("day").isSame(moment().startOf("day"))
								? t("dine.empty.order.today")
								: t("dine.empty.order.other")
						}
						personalizedAnimation="https://lottie.host/1ecea0f5-0be8-4bea-9e32-f1123537a809/alzd4A4NPJ.json"
					/>
				}
			/>
		</DataTable>
	);
};
