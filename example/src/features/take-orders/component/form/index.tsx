import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { useWindowDimensions } from "react-native";
import { Button } from "verity-quik";
import { useOrderStore } from "../../../../services/store/take-order";
import { Footer } from "./styled";

export const Form = () => {
	const { navigate } = useNavigation<any>();
	const { width } = useWindowDimensions();

	const { totalItems } = useOrderStore();

	return (
		<>
			{width < 700 ? (
				<Footer>
					<Button
						mode="contained"
						disabled={totalItems < 1}
						// onPress={() =>
						// 	navigate("CompleteOrderScreen", {
						// 		billSettings: billSettings,
						// 	})
						// }
					>
						{`${t("continue")} (${totalItems})`}
					</Button>
				</Footer>
			) : (
				<></>
				// <FormTakeOrder
				// 	restaurantId={restaurantId}
				// 	billSettings={billSettings}
				// />
			)}
		</>
	);
};
