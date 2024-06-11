import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { t } from "i18next";
import { useState } from "react";
import { Layout, Searchbar } from "verity-quik";
import { ALL_WAITING_LIST } from "../../../services/graphql/wating-list/query";
import { AddCustomer } from "../components/add-customer";
import { Waiting } from "../components/wating";

export const WaitingScreen = () => {
	const { restaurantId } = useRoute<any>().params;

	const [search, setSearch] = useState<string>("");

	const { data, loading, error, refetch } = useQuery(ALL_WAITING_LIST, {
		variables: {
			restaurantId,
		},
	});

	const [visible, setVisible] = useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<Layout
			title={t("dine.wating-list")}
			useDrawer
			action="plus"
			onPressAction={showModal}
		>
			<Searchbar
				searchQuery={search}
				setSearchQuery={setSearch}
				placeholder={t("dine.search.waiting")}
			/>

			<Waiting
				loading={loading}
				error={error}
				data={data?.allWaitingList}
				refetch={refetch}
				search={search}
			/>

			<AddCustomer
				restaurantId={restaurantId}
				visible={visible}
				hideModal={hideModal}
			/>
		</Layout>
	);
};
