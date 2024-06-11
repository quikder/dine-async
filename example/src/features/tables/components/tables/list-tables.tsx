import { useRefresh } from "@react-native-community/hooks";
import { t } from "i18next";
import type React from "react";
import { FlatList, RefreshControl, useWindowDimensions } from "react-native";

import { Empty, useWidth } from "verity-quik";
import type { TableType } from "../../types";
import { ItemTable } from "./item-table";

export const ListTables: React.FC<Props> = ({ data, refetch, search }) => {
	const { width } = useWindowDimensions();
	//Refresh
	const fetch = () => {
		refetch();
	};
	//@ts-ignore
	const { isRefreshing, onRefresh } = useRefresh(fetch);

	const tables = data.filter((item: TableType) => item.number !== 0);
	const filteredTables = tables.filter((table) => {
		if (search !== "") {
			return (
				table.number === Number.parseInt(search) ||
				table.capacity === Number.parseInt(search)
			);
		} else {
			return tables;
		}
	});

	return (
		<>
			<FlatList
				data={filteredTables}
				renderItem={({ item }) => <ItemTable {...item} />}
				keyExtractor={(item) => item.id}
				style={{ marginTop: 15 }}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
						tintColor="#999999"
					/>
				}
				numColumns={useWidth(width, 1, 3, 4, 6, 7)}
				key={useWidth(width, 1, 2, 3, 4, 5)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Empty
						isEmpty={data.length === 0}
						emptyText={t("dine.empty.table")}
					/>
				}
			/>
		</>
	);
};

interface Props {
	data: TableType[];
	refetch: any;
	search: string;
}
