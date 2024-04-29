import styled from "styled-components/native";
import { useWidth } from "verity-quik";

export const Body = styled.View`
    width: 100%;
    flex: 1;
    align-items: flex-end;
`;

export const Content = styled.View<{ $width: number; $bg: string }>`
    width: ${({ $width }) =>
			useWidth($width, "100%", "100%", "100%", "50%", "28.2%")};
    flex: 1;
    padding: 0 16px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${({ $bg }) => $bg};
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

export const TitleContent = styled.View`
    width: 80%;
`;

export const MethodContent = styled.View`
    width: 100%;
    margin-top: 15px;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const Method = styled.TouchableOpacity`
    width: 47%;
    height: 130px;
    background-color: #f3f3f3;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
`;
