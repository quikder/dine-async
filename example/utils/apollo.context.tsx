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

	const url = "828b-2600-4808-58b2-8700-ad50-feb1-787-4146.ngrok-free.app";

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
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5OTAzOTIuNjQ2ODQzLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjQ1YWMwMTBlLThjM2EtNDBlYi1iYmVmLTExZGUzOTVhMjE1MiIsInJvbGUiOiJ3YWl0ZXIifQ.WVaJoBW9cIxWh6YjeEDZdBwpYp84asz-6SCZL_lW_UY";

	const cashierToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk2MDExMTEuOTM5MjAxLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6Ijk4YjYyZWEyLTU4MTEtNDc4ZC04MzBhLWVhYzZmMWE0ZDE5MSIsInJvbGUiOiJjYXNoaWVyIn0.T4oJMgHfWd1auzoTY5Q1nCRGfZ7AWFm1qtAC8MBbu1I";

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
