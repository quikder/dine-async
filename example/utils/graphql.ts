import { gql } from "@apollo/client";

export const OWNER_PROFILE = gql`
query OwnerRestaurant($id: ID!){
  myRestaurantId(id: $id){
    billSettings{
      taxPercentage
      isIncludeTip
      tipPercentage
    }
  }
}
`;

export const TEAM_MEMBER_PROFILE = gql`
query TeamMember{
  teamMemberProfile{
    restaurant{
      billSettings{
        taxPercentage
        isIncludeTip
        tipPercentage
      }
    }
  }
}
`;