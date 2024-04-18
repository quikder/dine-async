import { gql } from "@apollo/client";

export const TAKE_ORDER = gql`
mutation TakeOrder(
  $restaurantId: ID!, 
  $orderInformationInput: OrderInformationInput!, 
  $deliveryInstructionsInput: DeliveryInstructionsInput!, 
  $orderItemInput: [OrderItemInput]!, 
  $subtotal: Decimal!
  ) {
  takeOrderRestaurant(
    restaurantId: $restaurantId
    orderInformationInput: $orderInformationInput
    deliveryInstructionsInput: $deliveryInstructionsInput
    subtotal: $subtotal
    orderItemInput: $orderItemInput
  ) {
    success
    error
  }
}
`;