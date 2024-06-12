import {
	NotificationFeedbackType,
	notificationAsync,
	selectionAsync,
} from "expo-haptics";
import { t } from "i18next";
import { capitalize } from "lodash";
import {
	type Dispatch,
	type FC,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import {
	Modal,
	Platform,
	ScrollView,
	View,
	useWindowDimensions,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button, TextInputBase, useUpdateEffect, useWidth } from "verity-quik";
import type { DeliveryItemType } from "../../../../features/take-orders/types";
import { useEditOrderStore } from "../../../../services/store/edit-order";
import { useOrderStore } from "../../../../services/store/take-order";
import { ControlQuantity } from "../../../control-quantity";
import type { DishType, ModifierItemType, ModifierType } from "../../types";
import { ModifierList } from "./modifiers-list";
import { Body, Box, Container } from "./styled";

interface Props {
	modalVisible: boolean;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
	dish: DishType;
	deliveryItemType: DeliveryItemType;
	isEdit?: boolean;
}

export const ModifiersModal: FC<Props> = ({
	modalVisible,
	setModalVisible,
	dish,
	isEdit,
	deliveryItemType,
}) => {
	const { width } = useWindowDimensions();
	const { name, price, modifiers } = dish;
	const theme = useTheme();

	//#Options
	const [note, setNote] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(1);
	const [newPrice, setNewPrice] = useState<number>(price);
	const [selectedModifiers, setSelectedModifiers] = useState<
		ModifierItemType[]
	>([]);
	const [modifiersId, setModifiersId] = useState<string[]>([]);

	const [modifierMandatories, setModifierMandatories] = useState<
		ModifierType[]
	>([]);

	const handleBack = () => {
		setModalVisible(false);
		setSelectedModifiers([]);
		setNote("");
		setQuantity(1);
		setNewPrice(price);
		setModifiersId([]);
	};

	useEffect(() => {
		setModifierMandatories(
			modifiers.filter((modifier) => modifier.isMandatory),
		);
	}, []);

	useUpdateEffect(() => {
		const total = selectedModifiers.reduce(
			//@ts-ignore
			(acc, item) => acc + Number.parseFloat(item.price),
			0,
		);
		//@ts-ignore
		const totalFormatted = Number.parseFloat(price) + Number.parseFloat(total);
		setNewPrice(totalFormatted);

		const ids = selectedModifiers.map((objeto) => objeto.id);

		//@ts-ignore
		setModifiersId(ids);
	}, [selectedModifiers]);

	const isAllModifiers = () => {
		// Verificar para cada modifierMandatory
		return modifierMandatories.every((mandatoryModifier) => {
			// Verificar si al menos uno de selectedModifiers coincide con el modifierMandatory actual
			return selectedModifiers.some((selectedModifier) => {
				return selectedModifier.modifier.id === mandatoryModifier.id;
			});
		});
	};

	const addDish = isEdit
		? useEditOrderStore((state) => state.addToOrder)
		: useOrderStore((state) => state.addToOrder);

	const handleAddDish = async () => {
		if (isAllModifiers()) {
			addDish({
				keyId: `${dish.id}-${deliveryItemType}${`-${
					modifiersId.length > 0 ? modifiersId : ""
				}`}${note ? `${`-${note}`}` : ""}`,
				id: dish.id,
				quantity,
				name,
				//@ts-ignore
				price: Number.parseFloat(newPrice),
				picture: dish.picture,
				deliveryItemType,
				note,
				//@ts-ignore
				modifiers: selectedModifiers,
			});
			selectionAsync();
			await handleBack();
		} else {
			notificationAsync(NotificationFeedbackType.Error);
		}
	};

	return (
		<Modal
			animationType={useWidth(width, "slide", "slide", "slide", "fade", "fade")}
			transparent={useWidth(width, false, false, false, true, true)}
			visible={modalVisible}
			presentationStyle={
				Platform.OS === "ios" &&
				useWidth(
					width,
					"formSheet",
					"formSheet",
					"formSheet",
					"overFullScreen",
					"overFullScreen",
				)
			}
			supportedOrientations={["portrait", "landscape"]}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<Body $width={width}>
				<Container $width={width}>
					<Appbar.Header statusBarHeight={0} style={{ borderRadius: 10 }}>
						{width >= 768 ? (
							<Appbar.Action icon="close" onPress={handleBack} />
						) : (
							<Appbar.BackAction onPress={handleBack} />
						)}
						<Appbar.Content title={capitalize(name)} />
					</Appbar.Header>
				</Container>

				<Box>
					<ScrollView showsVerticalScrollIndicator={false}>
						{modifiers.map((modifier) => (
							<ModifierList
								key={modifier.id}
								modifier={modifier}
								selectedModifiers={selectedModifiers}
								setSelectedModifiers={setSelectedModifiers}
							/>
						))}

						<View style={{ alignItems: "center" }}>
							<ControlQuantity
								quantity={quantity}
								size="large"
								onMinusPress={() => setQuantity(quantity - 1)}
								disabledMinus={quantity === 1}
								onPlusPress={() => setQuantity(quantity + 1)}
							/>
						</View>

						<TextInputBase
							mode="outlined"
							label={t("dine.special-instructions")}
							keyboardAppearance={theme.mode}
							useKeyboardAccesory
							autoCorrect={false}
							spellCheck={false}
							textContentType="none"
							contentStyle={Platform.OS === "ios" && { height: 100 }}
							multiline={true}
							numberOfLines={5}
							value={note}
							onChangeText={setNote}
						/>

						<Button
							mode="contained"
							style={{ marginTop: 10 }}
							onPress={handleAddDish}
						>
							{t("dine.add-dish")}
						</Button>
					</ScrollView>
				</Box>
			</Body>
		</Modal>
	);
};
