import { Image as DefaultImage } from "expo-image";
import styled from "styled-components/native";

export const Card = styled.View`
    width: 100%;
    margin-bottom: 10px;
`;

export const Subtitle = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 5px;
    border-radius: 2px;
`;

export const Image = styled(DefaultImage)`
    width: 50px;
    aspect-ratio: 1;
`;

export const GroupView = styled.View<{ $isLast: boolean }>`
    border-bottom-width: ${({ $isLast }) => ($isLast ? 0 : "0.4px")} ;
    border-bottom-color: #9a9a9a;
`;

export const Row = styled.View`
    border-bottom-width: 0.3px;
    border-bottom-color: "#ccc";
    margin-bottom: 5px;
    padding-bottom: 1px;
`;
