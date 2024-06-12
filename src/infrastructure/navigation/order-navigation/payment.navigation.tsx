import { useSubscription } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CashScreen } from "../../../features/payments/screen/cash.screen";
import { CustomScreen } from "../../../features/payments/screen/custom.screen";
import { QrScreen } from "../../../features/payments/screen/qr.screen";
import { SuccessScreen } from "../../../features/payments/screen/success.screen";
import { PAYMENT_SUCCESS } from "../../../services/graphql/payments/subscription";

const Stack = createNativeStackNavigator();

export const PaymentsNavigation = () => {
	const { navigate } = useNavigation<any>();
	const { subscriptionRoom, order } = useRoute<any>().params;

	useSubscription(PAYMENT_SUCCESS, {
		onData: (data) => {
			const updatedOrder = data.data.data.paymentSuccessSub.success;
			if (updatedOrder) {
				navigate("SuccessScreen", { order });
			}
		},
		variables: {
			room: `${subscriptionRoom}-order-${order.id}`,
		},
	});

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CashScreen" component={CashScreen} />
			<Stack.Screen name="QrScreen" component={QrScreen} />
			<Stack.Screen name="CustomScreen" component={CustomScreen} />
			<Stack.Screen
				name="SuccessScreen"
				component={SuccessScreen}
				options={{ presentation: "fullScreenModal", gestureEnabled: false }}
			/>
		</Stack.Navigator>
	);
};
