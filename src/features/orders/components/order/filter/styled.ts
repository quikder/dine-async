import { Modal } from "react-native-paper";
import styled from "styled-components/native";
import { useWidth } from "verity-quik";

interface WidthType {
	$width: number;
}

export const ModalBody = styled(Modal).attrs((props) => ({
	contentContainerStyle: {
		//@ts-ignore
		backgroundColor: props?.theme?.colors.background,
		padding: 10,
		margin: 20,
		borderRadius: 5,
		//@ts-ignore
		width: useWidth(props.$width, "90%", "90%", "90%", "40%", "30%"),
	},
}))<WidthType>`
    justify-content: center;
    align-items: center;
`;

export const Content = styled.View`
    position: relative;
`;

export const Press = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    position: absolute;
`;