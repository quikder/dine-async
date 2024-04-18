import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompleteOrderScreen } from "../../features/take-orders/screen/comple-order.screen";
import { TakeOrderScreen } from "../../features/take-orders/screen/take-order.screen";

export const TakeOrderNavigation = () => {
	const { restaurantId, billSettings } = useRoute<any>().params;
	const Stack = createNativeStackNavigator();

	return (
		<BottomSheetModalProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="TakeOrderScreen"
					component={TakeOrderScreen}
					initialParams={{ restaurantId }}
				/>
				<Stack.Screen
					name="CompleteOrderScreen"
					component={CompleteOrderScreen}
					initialParams={{ restaurantId, billSettings }}
					options={{ presentation: "formSheet" }}
				/>
			</Stack.Navigator>
		</BottomSheetModalProvider>
	);
};
