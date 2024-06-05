import { createDrawerNavigator } from "@react-navigation/drawer";
import { useProfile } from "../../../utils/profile.context";
import { TableScreen } from "../../features/tables/screen/table.screen";
import { OrderProvider } from "../../services/context/order.provider";
import { TableProvider } from "../../services/context/table.context";
import { OrderNavigation } from "./order-navigation";
import { TakeOrderNavigation } from "./take-order.navigation";

export const Navigation = () => {
	const Drawer = createDrawerNavigator();
	const { restaurant } = useProfile();

	return (
		<OrderProvider
			restaurantId={restaurant.id}
			serverBy={"Michael Davis"}
			subscriptionRoom={restaurant.subscriptionRoom}
		>
			<TableProvider subscriptionRoom={restaurant.subscriptionRoom}>
				<Drawer.Navigator screenOptions={{ headerShown: false }}>
					<Drawer.Screen
						name="OrdersNavigation"
						component={OrderNavigation}
						initialParams={{
							restaurantId: restaurant.id,
							subscriptionRoom: restaurant.subscriptionRoom,
							isEmployee: true,
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
					<Drawer.Screen
						name="TableScreen"
						component={TableScreen}
						initialParams={{
							restaurantId: restaurant.id,
							isEmployee: true,
						}}
					/>
				</Drawer.Navigator>
			</TableProvider>
		</OrderProvider>
	);
};
