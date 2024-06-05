
import { useQuery } from "@apollo/client";
import { t } from "i18next";
import type React from "react";
import { useState } from "react";
import { ErrorServer, Loading, Searchbar } from "verity-quik";
import { ALL_TABLES } from "../../../services/graphql/tables/query";
import { ListTables } from "./list-tables";

export const Tables: React.FC<Props> = ({ restaurantId }) => {
	const [search, setSearch] = useState<string>("");
	const { loading, error, data, refetch } = useQuery(ALL_TABLES, {
		variables: {
			restaurantId,
		},
	});

	if (loading) return <Loading />;
	if (error) return <ErrorServer refetch={refetch} error={error} />;

	const filteredTables = data?.allTables.filter((table: any) => {
		if (search !== "") {
			return (
				table.number === Number.parseInt(search) ||
				table.capacity === Number.parseInt(search)
			);
		} else {
			return data?.allTables;
		}
	});

	return (
		<>
			<Searchbar
				searchQuery={search}
				setSearchQuery={setSearch}
				placeholder={t("dine.search.table")}
			/>
			<ListTables data={filteredTables} refetch={refetch} search={search} />
		</>
	);
};

interface Props {
	restaurantId: string;
}
