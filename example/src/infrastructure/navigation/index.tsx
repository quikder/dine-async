import { createDrawerNavigator } from "@react-navigation/drawer";
import { OrderNavigation } from "./order.navigation";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen
				name="OrdersNavigation"
				component={OrderNavigation}
				initialParams={{ restaurantId: "858fb246-25f4-4f94-85d7-c69d9503dd79" }}
			/>
		</Drawer.Navigator>
	);
};
