import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CashScreen } from "../../../features/payments/screen/cash.screen";

export const PaymentsNavigation = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name="CashScreen" component={CashScreen} />
		</Stack.Navigator>
	);
};
