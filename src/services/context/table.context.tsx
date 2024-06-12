import { useSubscription } from "@apollo/client";
import { type ReactNode, createContext } from "react";
//@ts-ignore
import type { WaitingType } from "../../features/tables/types";
import { CHANGE_TABLE_STATUS } from "../graphql/tables/subscription";
import { ALL_WAITING_LIST } from "../graphql/wating-list/query";
import {
	NEW_WAITING,
	UPDTATE_WAITING,
} from "../graphql/wating-list/subscription";

export const TableContext = createContext(null);

export const TableProvider: React.FC<Props> = ({
	children,
	restaurantId,
	subscriptionRoom,
}) => {
	// const client = useApolloClient();

	useSubscription(CHANGE_TABLE_STATUS, {
		onData: () => {},
		variables: {
			room: subscriptionRoom,
		},
	});

	useSubscription(NEW_WAITING, {
		onData: (data) => {
			const client = data.client;

			const cacheOrders: any = client.readQuery({
				query: ALL_WAITING_LIST,
				variables: { restaurantId },
			});

			const newCustomer: WaitingType = data.data.data.newWaiting?.waiting;

			if (cacheOrders) {
				const { allWaitingList } = cacheOrders;

				// Verificar si el nuevo cliente ya existe en la lista
				const exists = allWaitingList.some(
					(customer: WaitingType) => customer.id === newCustomer.id,
				);

				if (!exists) {
					//@ts-ignore
					client.writeQuery({
						query: ALL_WAITING_LIST,
						variables: {
							restaurantId,
						},
						data: {
							allWaitingList: [...allWaitingList, newCustomer],
						},
					});
				}
			}
		},
		variables: {
			room: subscriptionRoom,
		},
	});

	useSubscription(UPDTATE_WAITING, {
		onData: (data) => {
			const client = data.client;

			const cacheOrders: any = client.readQuery({
				query: ALL_WAITING_LIST,
				variables: { restaurantId },
			});

			const updatedWaiting = data.data.data.updateWaiting?.waiting;

			if (cacheOrders) {
				const { allWaitingList } = cacheOrders;

				const updatedList = allWaitingList.filter(
					(item: any) => item.id !== updatedWaiting.id,
				);

				client.writeQuery({
					query: ALL_WAITING_LIST,
					variables: {
						restaurantId,
					},
					data: {
						allWaitingList: updatedList,
					},
				});
			}
		},
		variables: {
			room: subscriptionRoom,
		},
	});

	return <TableContext.Provider value={null}>{children}</TableContext.Provider>;
};

interface Props {
	children: ReactNode;
	subscriptionRoom: string;
	restaurantId: string;
}

// interface cacheWaitingType {
// 	allWaitingList: WaitinType[];
// }
