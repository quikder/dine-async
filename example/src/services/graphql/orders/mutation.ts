import { gql } from "@apollo/client";

export const SEND_INVOICE = gql`
mutation SendInvoice($email: String!, $orderId: ID!){
  sendInvoice(email: $email, orderId: $orderId){
    success
    error
  }
}
`;


export const CANCELLED_ORDER = gql`
mutation CancelOrder($orderId: ID!, $password: String!, $isFullyCancelled: Boolean!, $itemCancellationInput: [ItemCancellationInput], $reason: String = "", $totalItems: Int) {
  cancelledOrder(
    orderId: $orderId
    password: $password
    isFullyCancelled: $isFullyCancelled
    itemCancellationInput: $itemCancellationInput
    reason: $reason
    totalItems: $totalItems
  ) {
    success
    error
  }
}
`;

export const REFUND_ORDER = gql`
mutation RefundOrder($orderId: ID!, 
  $password: String!, 
  $isFullyCancelled: Boolean!, 
  $itemCancellationInput: [ItemCancellationInput], 
  $reason: String = "", 
  $totalItems: Int, 
  $refundMethod: String!,
	$amount: Decimal!
) {
  refoundOrder(
    orderId: $orderId
    password: $password
    isFullyRefund: $isFullyCancelled
    itemRefundInput: $itemCancellationInput
    reason: $reason
    totalItems: $totalItems
    refundMethod: $refundMethod
    amount: $amount
  ) {
    success
    error
  }
}
`;

export const EDIT_ORDER = gql`
mutation EditOrder($orderId: ID!, $orderItemInput: [OrderItemInput]!, $subtotal: Decimal!) {
  editOrder(
    orderId: $orderId
    orderItemInput: $orderItemInput
    subtotal: $subtotal
  ) {
    success
    error
  }
}
`;

export const CHANGE_ORDER_STATUS = gql`
mutation ChangeOrderStatus($orderId: ID!, $status: String!) {
  changeOrderStatus(orderId: $orderId, status: $status) {
    success
    error
  }
}
`;