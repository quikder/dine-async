import { useQuery } from "@apollo/client";
import { type ReactNode, createContext, useContext } from "react";
import { ErrorServer, Loading } from "verity-quik";
import { TEAM_MEMBER_PROFILE } from "./graphql";

interface BillSettingType {
	taxPercentage: number;
	isIncludeTip: boolean;
	tipPercentage: number;
}

interface RestaurantType {
	id: string
	billSettings: BillSettingType;
}

interface TeamMemberType {
	restaurant: RestaurantType;
}

export const ProfileContext = createContext<TeamMemberType>({
	restaurant: {
		id: "",
		billSettings: {
			taxPercentage: 0,
			isIncludeTip: false,
			tipPercentage: 0,
		},
	},
});

interface Props {
	children: ReactNode;
}

export function useProfile() {
	return useContext(ProfileContext);
}

export const ProfileProvider = ({ children }: Props) => {
	const { data, loading, error, refetch } = useQuery(TEAM_MEMBER_PROFILE);

	if (loading) return <Loading />;
	if (error) return <ErrorServer error={error} refetch={refetch} />;

	return (
		<ProfileContext.Provider
			value={{ restaurant: data.teamMemberProfile.restaurant }}
		>
			{children}
		</ProfileContext.Provider>
	);
};
