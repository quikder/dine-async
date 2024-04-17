import {
    ApolloClient,
    ApolloProvider as ApolloProviderDefault,
    InMemoryCache,
    split,
    //@ts-ignore
} from "@apollo/client";
//@ts-ignore
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
//@ts-ignore
import { createUploadLink } from "apollo-upload-client";
import type { ReactNode } from "react";
import type React from "react";

export const ApolloProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const cache = new InMemoryCache();

	const link = createUploadLink({
		uri: `https://${process.env.EXPO_PUBLIC_API_URL}/graphql/`,
	});

	const splitLink = split(({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	}, link);

	//@ts-ignore
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization:
					"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5Njg0MjEuNzk5Njg3LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjIiLCJyb2xlIjoib3duZXIifQ.Kk1fzjcRC5cQ_TiFfv3c5HPs7oGv8_x7Vdvh5SkyfGY",
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
