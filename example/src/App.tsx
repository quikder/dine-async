import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "verity-quik";
import { Navigation } from "./navigation";

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<NavigationContainer>
					<Navigation />
				</NavigationContainer>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
