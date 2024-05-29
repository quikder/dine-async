import { Image } from "expo-image";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

export const Section = styled.View`
    width: 100%;
    margin-top: 5px;
`;

export const Row = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    justify-content: space-between;
`;

export const Img = styled(Image)`
    width: 40px;
    aspect-ratio: 1;
    position: absolute;
    left: 0;
`;

export const Price = styled(Text)`
    position: absolute;
    right: 40px;
`;
