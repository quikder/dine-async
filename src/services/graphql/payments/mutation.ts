import { gql } from "@apollo/client";

export const CHARGE_IN_CASH = gql`
mutation ChargeInCash($orderId: ID!, $amount: Decimal!, $change: Decimal!) {
    chargeInCash(orderId: $orderId, amount: $amount, change: $change) {
      success
      error
    }
  }
`;

export const CHARGE_PERSONALIZED = gql`
mutation ChargePersonalized($orderId: ID!, $method: String!) {
  chargePersonalized(method: $method, orderId: $orderId) {
    success
    error
  }
}
`;
