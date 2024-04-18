import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "verity-quik";
import { ProfileProvider } from "../utils/profile.context";
import i18n from "./infrastructure/i18n";
import { Navigation } from "./infrastructure/navigation";
import { ApolloProvider } from "./services/context/apollo.context";

export default function App() {
	return (
		<SafeAreaProvider>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<ApolloProvider>
						<ProfileProvider>
							<NavigationContainer>
								<Navigation />
							</NavigationContainer>
						</ProfileProvider>
					</ApolloProvider>
				</ThemeProvider>
			</I18nextProvider>
		</SafeAreaProvider>
	);
}
