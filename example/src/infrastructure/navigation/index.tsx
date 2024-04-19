import { createDrawerNavigator } from "@react-navigation/drawer";
import { useProfile } from "../../../utils/profile.context";
import { OrderProvider } from "../../services/context/order.provider";
import { OrderNavigation } from "./order.navigation";
import { TakeOrderNavigation } from "./take-order.navigation";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();

	const { restaurant } = useProfile();

	return (
		<OrderProvider
			restaurantId={restaurant.id}
			subscriptionRoom={restaurant.subscriptionRoom}
		>
			<Drawer.Navigator screenOptions={{ headerShown: false }}>
				<Drawer.Screen
					name="OrdersNavigation"
					component={OrderNavigation}
					initialParams={{
						restaurantId: restaurant.id,
					}}
				/>
				<Drawer.Screen
					name="TakeOrderNavigation"
					component={TakeOrderNavigation}
					initialParams={{
						restaurantId: restaurant.id,
						billSettings: restaurant.billSettings,
					}}
				/>
			</Drawer.Navigator>
		</OrderProvider>
	);
};
