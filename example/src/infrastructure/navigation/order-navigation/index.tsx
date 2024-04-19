import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
		</Stack.Navigator>
	);
};
