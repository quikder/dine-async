import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import type { FC } from "react";
import { useWindowDimensions } from "react-native";
import { Button } from "verity-quik";
import { useEditOrderStore } from "../../../../../services/store/edit-order";
import { Footer } from "./styled";

interface Props {
	orderId: string;
}

export const Form: FC<Props> = ({ orderId }) => {
	const { navigate } = useNavigation<any>();
	const { width } = useWindowDimensions();

	const { totalItems } = useEditOrderStore();

	return (
		<>
			{width < 700 ? (
				<Footer>
					<Button
						mode="contained"
						disabled={totalItems < 1}
						onPress={() => navigate("CompleteEditScreen", { orderId })}
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
