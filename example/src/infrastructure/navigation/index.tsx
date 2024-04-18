import { createDrawerNavigator } from "@react-navigation/drawer";
import { useProfile } from "../../../utils/profile.context";
import { OrderNavigation } from "./order.navigation";
import { TakeOrderNavigation } from "./take-order.navigation";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();

	const { restaurant } = useProfile();

	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen
				name="OrdersNavigation"
				component={OrderNavigation}
				initialParams={{
					restaurantId: "858fb246-25f4-4f94-85d7-c69d9503dd79",
				}}
			/>
			<Drawer.Screen
				name="TakeOrderNavigation"
				component={TakeOrderNavigation}
				initialParams={{
					restaurantId: "858fb246-25f4-4f94-85d7-c69d9503dd79",
					billSettings: restaurant.billSettings,
				}}
			/>
		</Drawer.Navigator>
	);
};
