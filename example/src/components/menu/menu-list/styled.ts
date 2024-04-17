
import { BlurView } from "expo-blur";
import { Image as DefaultImage } from "expo-image";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { useWidth } from "verity-quik";

export const Body = styled.Pressable<PropsWidth>`
    width: ${({ $isEdit, $width }) =>
			$isEdit ? "25%" : useWidth($width, "50%", "25%", "20%", "16.66%", "10%")};
    aspect-ratio: 1;
    position: relative;
    border: 0.7px ${({ $requiresModifier, theme }) =>
			$requiresModifier ? theme.colors.primary : "gray"};
    position: relative;
    opacity: ${({ $isPress }) => ($isPress ? 0.3 : 1)};
`;

interface PropsWidth {
	$width: number;
	$requiresModifier: boolean;
	$isPress: boolean;
	$isEdit?: boolean;
}

export const Image = styled(DefaultImage)`
    width: 100%;
    height: 100%;
`;

const Viewer = Platform.OS === "android" ? View : BlurView;

export const NameContent = styled(Viewer)`
    width: 100%;
    padding: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #00000080;
`;
