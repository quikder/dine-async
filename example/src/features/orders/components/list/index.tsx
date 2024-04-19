import { useQuery } from "@apollo/client";
import type { Moment } from "moment";
import moment from "moment";
import type { FC } from "react";
import { FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { ErrorServer, Loading } from "verity-quik";
import { ALL_ORDERS } from "../../../../services/graphql/orders/query";
import type { OrderStatusType, OrderType } from "../../types";
import { Item } from "../item";

interface Props {
	restaurantId: string;
	search: string;
	date: Moment;
	paidStatus: boolean | "";
	orderStatus: OrderStatusType | "";
}

export const List: FC<Props> = ({
	restaurantId,
	search,
	date,
	paidStatus,
	orderStatus,
}) => {
	const { loading, error, data, refetch } = useQuery(ALL_ORDERS, {
		fetchPolicy: "cache-and-network",
		nextFetchPolicy: "cache-and-network",
		variables: {
			restaurantId,
			date: date.format("YYYY-MM-DD"),
		},
	});

	if (loading)
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

	return (
		<DataTable style={{ flex: 1, marginTop: 16 }}>
			<FlatList
				data={filteredAndSortedOrder()}
				renderItem={({ item }) => <Item order={item} />}
				keyExtractor={(item: OrderType) => item.id}
			/>
		</DataTable>
	);
};
