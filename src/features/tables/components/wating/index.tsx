import { useRefresh } from "@react-native-community/hooks";
import { t } from "i18next";
import { toLower } from "lodash";
import type { FC } from "react";
import { FlatList, RefreshControl } from "react-native";
import { DataTable } from "react-native-paper";
import { Empty, ErrorServer, Loading } from "verity-quik";
//@ts-ignore
import type { WaitingType } from "../../types";
import { Header } from "./header";
import { Item } from "./item";

export const Waiting: FC<Props> = ({
	loading,
	error,
	data,
	refetch,
	search,
}) => {
	if (loading) return <Loading />;
	if (error) return <ErrorServer error={error} refetch={refetch} />;

	const dataSearch: WaitingType[] = data.filter(
		(item) =>
			toLower(item.customerName).includes(toLower(search)) ||
			item.numberOfPeople === Number.parseInt(search),
	);

	const fetch = async () => {
		try {
			await refetch();
		} catch (error) {
			console.error("Error al refrescar los datos:", error);
		}
	};

	const { isRefreshing, onRefresh } = useRefresh(fetch);

	return (
		<>
			<DataTable style={{ flex: 1 }}>
				<Header />
				<FlatList
					data={dataSearch}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Item {...item} />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={
						<Empty
							isEmpty={data.length === 0}
							emptyText={t("empty.waiting-list")}
						/>
					}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={onRefresh}
							tintColor="#999999"
						/>
					}
				/>
			</DataTable>
		</>
	);
};

interface Props {
	loading: boolean;
	error: any;
	data: WaitingType[];
	refetch: any;
	search: string;
}
