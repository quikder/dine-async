import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CashScreen } from "../../../features/payments/screen/cash.screen";
import { SuccessScreen } from "../../../features/payments/screen/success.screen";

const Stack = createNativeStackNavigator();

export const PaymentsNavigation = () => {

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CashScreen" component={CashScreen} />
			<Stack.Screen name='SuccessScreen' component={SuccessScreen} />
		</Stack.Navigator>
	);
};
