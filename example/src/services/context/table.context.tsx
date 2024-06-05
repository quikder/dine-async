import { useSubscription } from "@apollo/client";
import { type ReactNode, createContext } from "react";
import { CHANGE_TABLE_STATUS } from "../graphql/tables/subscription";

export const TableContext = createContext(null);

export const TableProvider: React.FC<Props> = ({
	children,
	subscriptionRoom,
}) => {
	// const client = useApolloClient();

	useSubscription(CHANGE_TABLE_STATUS, {
		onData: () => {},
		variables: {
			room: subscriptionRoom,
		},
	});

	return <TableContext.Provider value={null}>{children}</TableContext.Provider>;
};

interface Props {
	children: ReactNode;
	subscriptionRoom: string;
}

// interface cacheWaitingType {
// 	allWaitingList: WaitinType[];
// }
