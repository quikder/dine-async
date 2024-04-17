import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrdersScreen } from "../features/orders/screen/orders.screen";

export const OrderNavigation = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="OrdersScreen" component={OrdersScreen} />
		</Stack.Navigator>
	);
};
