import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TakeOrderScreen } from "../../features/take-orders/screen/take-order.screen";

export const TakeOrderNavigation = () => {
	const { restaurantId } = useRoute<any>().params;
	const Stack = createNativeStackNavigator();

	return (
		<BottomSheetModalProvider>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="TakeOrderScreen"
					component={TakeOrderScreen}
					initialParams={{ restaurantId }}
				/>
			</Stack.Navigator>
		</BottomSheetModalProvider>
	);
};
