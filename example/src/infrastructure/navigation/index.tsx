import { createDrawerNavigator } from "@react-navigation/drawer";
import { OrderNavigation } from "./order.navigation";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="OrdersNavigation" component={OrderNavigation} />
		</Drawer.Navigator>
	);
};