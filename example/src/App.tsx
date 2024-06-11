import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, ToastUi } from "verity-quik";
import { ApolloProvider } from "../utils/apollo.context";
import { ProfileProvider } from "../utils/profile.context";
import i18n from "./infrastructure/i18n";
import { Navigation } from "./infrastructure/navigation";

export default function App() {
	const role = Platform.OS === "ios" ? "waiter" : "cashier";
	return (
		<SafeAreaProvider>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<ToastUi />
					<GestureHandlerRootView style={{ flex: 1, zIndex: -1 }}>
						<ApolloProvider role={role}>
							<ProfileProvider>
								<NavigationContainer>
									<Navigation role={role} />
								</NavigationContainer>
							</ProfileProvider>
						</ApolloProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</I18nextProvider>
		</SafeAreaProvider>
	);
}

// const ownerToken =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5Njg0MjEuNzk5Njg3LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjIiLCJyb2xlIjoib3duZXIifQ.Kk1fzjcRC5cQ_TiFfv3c5HPs7oGv8_x7Vdvh5SkyfGY";

// const waiterToken =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5OTAzOTIuNjQ2ODQzLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6IjQ1YWMwMTBlLThjM2EtNDBlYi1iYmVmLTExZGUzOTVhMjE1MiIsInJvbGUiOiJ3YWl0ZXIifQ.WVaJoBW9cIxWh6YjeEDZdBwpYp84asz-6SCZL_lW_UY";

// const cashierToken =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTYwNjc0NzIuODcxODU2LCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6Ijk4YjYyZWEyLTU4MTEtNDc4ZC04MzBhLWVhYzZmMWE0ZDE5MSIsInJvbGUiOiJjYXNoaWVyIn0.F76K_o9hGxNVULhNMbPL21n2aMjXvkU8URlXdO4c33I";
