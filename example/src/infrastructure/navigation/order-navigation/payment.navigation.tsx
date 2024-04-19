import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CashScreen } from "../../../features/payments/screen/cash.screen";

const Stack = createNativeStackNavigator();

export const PaymentsNavigation = () => {
	const { order } = useRoute<any>().params;
	console.log(order);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CashScreen" component={CashScreen} />
		</Stack.Navigator>
	);
};
