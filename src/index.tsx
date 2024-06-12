import { TableScreen } from "./features/tables/screen/table.screen";
import { WaitingScreen } from "./features/tables/screen/waiting.screen";
import { OrderNavigation } from "./infrastructure/navigation/order-navigation";
import { TakeOrderNavigation } from "./infrastructure/navigation/take-order.navigation";
import { OrderProvider } from "./services/context/order.provider";
import { TableProvider } from "./services/context/table.context";

export {
	OrderProvider,
	TableProvider,
	OrderNavigation,
	TakeOrderNavigation,
	TableScreen,
	WaitingScreen,
};
