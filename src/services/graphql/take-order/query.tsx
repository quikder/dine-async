import { gql } from "@apollo/client";

export const ALL_DISHES = gql`
query AllDishes($restaurantId: ID!) {
  allDishes(restaurantId: $restaurantId) {
    id
    name
    category {
      id
      name
    }
    picture
    price
    description
    hasAlcohol
    requiresModifier
    isAvailable
    daysAvailable {
      name
    }
    modifiers {
      id
      name
      appLabel
      isMandatory
      singleSelection
      modifierItems {
        id
        name
        picture
        price
        modifier {
          id
        }
      }
      maxSelections
    }
  }
}
`;