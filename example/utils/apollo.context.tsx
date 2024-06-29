import {
	ApolloClient,
	ApolloProvider as ApolloProviderDefault,
	InMemoryCache,
	split,
	//@ts-ignore
} from "@apollo/client";
//@ts-ignore
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
//@ts-ignore
import { createUploadLink } from "apollo-upload-client";
import type { ReactNode } from "react";
import type React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";

export const ApolloProvider: React.FC<{
	children: ReactNode;
	role: "owner" | "cashier" | "waiter";
}> = ({ children, role }) => {
	const cache = new InMemoryCache();

	const url = "5539-2600-4808-58b2-8700-2da9-1332-2793-13b7.ngrok-free.app";

	const link = createUploadLink({
		uri: `https://${url}/graphql/`,
	});

	const wsLink = new WebSocketLink(
		new SubscriptionClient(`wss://${url}/graphql/`, {
			reconnect: true,
		}),
	);

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		link,
	);

	const ownerToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5Njg0MjEuNzk5Njg3LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjIiLCJyb2xlIjoib3duZXIifQ.Kk1fzjcRC5cQ_TiFfv3c5HPs7oGv8_x7Vdvh5SkyfGY";

	const waiterToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjAyMDA5NjEuMDgxMzEsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiNDVhYzAxMGUtOGMzYS00MGViLWJiZWYtMTFkZTM5NWEyMTUyIiwicm9sZSI6ImNhc2hpZXIifQ.hd0EbgPx_RCnXN_C8iGzV38qpCwAyhDn5P0fMa4qv70";

	const cashierToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjExNTA3MzIuNjU1OTA4LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6Ijk4YjYyZWEyLTU4MTEtNDc4ZC04MzBhLWVhYzZmMWE0ZDE5MSIsInJvbGUiOiJjYXNoaWVyIn0.xZLLdBeDEyo8sU2KIVaDO9DXFMXbR0-KpYnBycCpFxg";

	//@ts-ignore
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: `JWT ${
					role === "owner"
						? ownerToken
						: role === "waiter"
							? waiterToken
							: cashierToken
				}`,
			},
		};
	});

	const client = new ApolloClient({
		//@ts-ignore
		link: authLink.concat(splitLink),
		cache,
	});

	return (
		<ApolloProviderDefault client={client}>{children}</ApolloProviderDefault>
	);
};
