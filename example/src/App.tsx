import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "verity-quik";

export default function App() {
	return (
		<ThemeProvider>
			<View style={styles.container}>
				<Text>aa</Text>
			</View>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		width: 60,
		height: 60,
		marginVertical: 20,
	},
});
