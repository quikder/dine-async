import { useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Success } from "../components/success";

export const SuccessScreen = () => {
	const params = useRoute<any>().params;
	const theme = useTheme();

    

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<Success change={params?.change} order={params?.order} />
		</SafeAreaView>
	);
};
