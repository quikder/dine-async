import { gql } from "@apollo/client";

export const ALL_ORDERS = gql`
query AllOrders($restaurantId: ID!, $date: Date!) {
  allOrders(restaurantId: $restaurantId, date: $date) {
    id
    customerName
    tableNumber
    status
    deliveryType
    createdAt
    isPaid
    inApp
    items {
      id
      dish {
        name
        picture
      }
      isDelivered
      isForRestaurant
      note
      price
      quantity
      total
      modifierItems {
        id
        name
        modifier {
          id
          name
        }
      }
    }
    servedBy{
      name
    }
    financialDetails {
      subtotal
      tax
      tip
      totalRestaurant
      totalOrder
    }
    deliveryInstructions{
      apartmentNumber
      phoneNumber{
        number
      }
      address{
        streetAddress
        city
        stateProvince
        postalCode
        country
        latitude
        longitude
      }
    }
    qrPayment {
      qrCode
    }
    payments{
      id
      chargedBy{
        name
      }
      paymentType
      cashPayment{
        amount
        change
      }
      cardPayment{
        stripePaymentId
        cardNumber
        brand
        wallet
      }
      customPayment{
        method
      }
    }
    canceled {
      id
      isFullyCancelled
      reason
      totalItems
    }
    refunds {
      id
      amount
      isFullyRefunded
      reason
      method
      refundedBy
      totalItems
    }
  }
}
`;

export const RESTAURANT_INVOICE = gql`
query RestaurantInvoice($restaurantId: ID!){
  restaurantInvoice(restaurantId: $restaurantId){
    name
    phoneNumbers{
      number
    }
    address{
      streetAddress,
      city,
      stateProvince, 
      postalCode
    }
    billSettings{
      taxPercentage, 
      isIncludeTip
      tipPercentage
      usePayQr
      stripeMobileCommission
    }
  }
}
`;
