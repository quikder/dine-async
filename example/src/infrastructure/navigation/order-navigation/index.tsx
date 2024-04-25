import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddDishesScreen } from "../../../features/orders/screen/add-dishes.screen";
import { CancelScreen } from "../../../features/orders/screen/cancel.screen";
import { OrdersScreen } from "../../../features/orders/screen/orders.screen";
import { PaymentsNavigation } from "./payment.navigation";

export const OrderNavigation = () => {
	const { restaurantId, subscriptionRoom } = useRoute<any>().params;
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="OrdersScreen"
				component={OrdersScreen}
				initialParams={{ restaurantId }}
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
				<Stack.Screen name="AddDishesScreen" component={AddDishesScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
};
