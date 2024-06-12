import { Image as DefaultImage } from "expo-image";
import styled from "styled-components/native";

export const Row = styled.View`
    width: 100%;
    background: ${({ theme }) => theme.colors.background};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
     padding: 5px 0;
`;

export const Image = styled(DefaultImage)`
    width: 20%;
    aspect-ratio: 1;
    border-radius: 5px;
`;

export const Content = styled.View<{ $haveImage: boolean }>`
    width: ${({ $haveImage }) => ($haveImage ? "79%" : "100%")};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
`;

export const InformationBox = styled.View`
    width: 70%;
`;

export const SwipContent = styled.TouchableOpacity`
    aspect-ratio: 1;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.error};
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;