import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddDishesScreen } from "../../../features/orders/screen/add-dishes.screen";
import { CancelScreen } from "../../../features/orders/screen/cancel.screen";
import { CompleteEditScreen } from "../../../features/orders/screen/complete-edit.screen";
import { OrderDetailsScreen } from "../../../features/orders/screen/order-details.screen";
import { OrdersScreen } from "../../../features/orders/screen/orders.screen";
import { PaymentsNavigation } from "./payment.navigation";

export const OrderNavigation = () => {
	const { restaurantId, subscriptionRoom, isEmployee } = useRoute<any>().params;
	const Stack = createNativeStackNavigator();

	return (
		<BottomSheetModalProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="OrdersScreen"
					component={OrdersScreen}
					initialParams={{ restaurantId }}
				/>

				<Stack.Screen
					name="OrderDetailsScreen"
					component={OrderDetailsScreen}
					initialParams={{ restaurantId, subscriptionRoom, isEmployee }}
				/>

				<Stack.Screen
					name="PaymentNavigation"
					component={PaymentsNavigation}
					initialParams={{ restaurantId, subscriptionRoom }}
				/>

				<Stack.Screen
					name="CancelScreen"
					component={CancelScreen}
					initialParams={{ restaurantId }}
				/>
				<Stack.Group>
					<Stack.Screen
						name="AddDishesScreen"
						component={AddDishesScreen}
						initialParams={{ restaurantId }}
						options={{ presentation: "formSheet" }}
					/>
					<Stack.Screen
						name="CompleteEditScreen"
						component={CompleteEditScreen}
						initialParams={{ restaurantId }}
						options={{ presentation: "formSheet" }}
					/>
				</Stack.Group>
			</Stack.Navigator>
		</BottomSheetModalProvider>
	);
};
