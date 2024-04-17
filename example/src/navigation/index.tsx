import { createDrawerNavigator } from "@react-navigation/drawer";
import { OrderNavigation } from "dine-async";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="OrdersNavigation" component={OrderNavigation} />
		</Drawer.Navigator>
	);
};