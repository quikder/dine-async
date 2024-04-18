import {
	ApolloClient,
	ApolloProvider as ApolloProviderDefault,
	InMemoryCache,
} from "@apollo/client";
//@ts-ignore
import { setContext } from "@apollo/client/link/context";
//@ts-ignore
import { createUploadLink } from "apollo-upload-client";
import type { ReactNode } from "react";
import type React from "react";

export const ApolloProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const cache = new InMemoryCache();

	const link = createUploadLink({
		uri: "https://b719-67-81-158-59.ngrok-free.app/graphql/",
	});

	// const splitLink = split(({ query }) => {
	// 	const definition = getMainDefinition(query);
	// 	return (
	// 		definition.kind === "OperationDefinition" &&
	// 		definition.operation === "subscription"
	// 	);
	// }, link);

	const ownerToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5Njg0MjEuNzk5Njg3LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjIiLCJyb2xlIjoib3duZXIifQ.Kk1fzjcRC5cQ_TiFfv3c5HPs7oGv8_x7Vdvh5SkyfGY";

	const waiterToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5OTAzOTIuNjQ2ODQzLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjQ1YWMwMTBlLThjM2EtNDBlYi1iYmVmLTExZGUzOTVhMjE1MiIsInJvbGUiOiJ3YWl0ZXIifQ.WVaJoBW9cIxWh6YjeEDZdBwpYp84asz-6SCZL_lW_UY";

	//@ts-ignore
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: `JWT ${waiterToken}`,
			},
		};
	});

	const client = new ApolloClient({
		//@ts-ignore
		link: authLink.concat(link),
		cache,
	});

	return (
		<ApolloProviderDefault client={client}>{children}</ApolloProviderDefault>
	);
};
