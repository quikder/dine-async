import { gql } from "@apollo/client";

export const ALL_WAITING_LIST = gql`
query AllWaiting($restaurantId: ID!) {
    allWaitingList(restaurantId: $restaurantId) {
      id
      customerName
      numberOfPeople
      inApp
      isNotified
    }
  }
`;
