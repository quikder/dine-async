import { gql } from "@apollo/client";

export const PAYMENT_SUCCESS = gql`
subscription PaymentSuccess($room: String!){
  paymentSuccessSub(room: $room){
    success
  }
}
`;
