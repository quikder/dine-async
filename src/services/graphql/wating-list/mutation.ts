import { gql } from "@apollo/client";

export const ADD_TO_WAITING_LIST = gql`
mutation AddCustomerWaitingList($restaurantId: ID!, $customerName: String!, $numberOfPeople: Int!) {
    addCustomerToWaitingList(
      restaurantId: $restaurantId
      customerName: $customerName
      numberOfPeople: $numberOfPeople
    ) {
      success
      error
      waitingList {
        id
        customerName
        numberOfPeople
        isNotified
        inApp
      }
    }
  }
`;

export const READY_WAITING = gql`
mutation ReadyWaiting($waitingId: ID!) {
  readyWaiting(waitingId: $waitingId) {
    success
    error
  }
}
`;
