import { gql } from "@apollo/client";

export const SEND_INVOICE = gql`
mutation SendInvoice($email: String!, $orderId: ID!){
  sendInvoice(email: $email, orderId: $orderId){
    success
    error
  }
}
`;