import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TakeOrderScreen } from "../../features/take-orders/screen/take-order.screen";

export const TakeOrderNavigation = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="TakeOrderScreen" component={TakeOrderScreen} />
		</Stack.Navigator>
	);
};
