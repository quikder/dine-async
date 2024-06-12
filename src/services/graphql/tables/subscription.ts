import { gql } from "@apollo/client";

export const CHANGE_TABLE_STATUS = gql`
subscription MySubscription($room: String!) {
    changeTableAvailable(room: $room) {
      table {
        id
        number
        capacity
        isAvailable
      }
    }
  }
`;
