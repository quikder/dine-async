import { gql } from "@apollo/client";

export const CHANGE_TABLE_AVAILABILITY = gql`
mutation ChangeTableAvailable($tableId: ID!) {
    changeTableAvailable(tableId: $tableId) {
      success
      error
    }
  }
`;