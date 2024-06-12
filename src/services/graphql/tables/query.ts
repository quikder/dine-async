import { gql } from "@apollo/client";

export const ALL_TABLES = gql`
query AllTables($restaurantId: ID!) {
    allTables(restaurantId: $restaurantId) {
      id
      number
      capacity
      isAvailable
      waiters {
        id
        name
      }
    }
  }
`;