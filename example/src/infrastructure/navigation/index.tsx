import { createDrawerNavigator } from "@react-navigation/drawer";
import type { FC } from "react";
import { useProfile } from "../../../utils/profile.context";
import { TableScreen } from "../../features/tables/screen/table.screen";
import { WaitingScreen } from "../../features/tables/screen/waiting.screen";
import { OrderProvider } from "../../services/context/order.provider";
import { TableProvider } from "../../services/context/table.context";
import { OrderNavigation } from "./order-navigation";
import { TakeOrderNavigation } from "./take-order.navigation";

interface Props {
	role: "owner" | "cashier" | "waiter";
}

export const Navigation: FC<Props> = ({ role }) => {
	const Drawer = createDrawerNavigator();
	const { restaurant } = useProfile();

	return (
		<OrderProvider
			restaurantId={restaurant.id}
			serverBy={"Michael Davis"}
			subscriptionRoom={
				role === "waiter"
					? `45ac010e-8c3a-40eb-bbef-11de395a2152-${restaurant.subscriptionRoom}`
					: restaurant.subscriptionRoom
			}
		>
			<TableProvider
				restaurantId={restaurant.id}
				subscriptionRoom={restaurant.subscriptionRoom}
			>
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
					<Drawer.Screen
						name="WaitingScreen"
						component={WaitingScreen}
						initialParams={{
							restaurantId: restaurant.id,
						}}
					/>
				</Drawer.Navigator>
			</TableProvider>
		</OrderProvider>
	);
};
