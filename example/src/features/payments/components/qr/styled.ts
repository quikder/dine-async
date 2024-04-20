import { Image } from "expo-image";
import styled from "styled-components/native";

export const Body = styled.View`
    width: 100%;
    flex: 1;
`;

export const ImgContent = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const Img = styled(Image)`
    width: 80%;
    aspect-ratio: 1;
`;