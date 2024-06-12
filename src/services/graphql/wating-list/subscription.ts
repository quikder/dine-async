import { gql } from "@apollo/client";

export const NEW_WAITING = gql`
subscription NEW_WAITING($room: String!) {
    newWaiting(room: $room) {
      waiting {
        id
        customerName
        numberOfPeople
        inApp
        isNotified
      }
    }
  }
`;

export const UPDTATE_WAITING = gql`
subscription UpdateWaiting($room: String = "") {
  updateWaiting(room: $room) {
    waiting {
      id
      customerName
      numberOfPeople
      inApp
      isNotified
    }
  }
}
`;
