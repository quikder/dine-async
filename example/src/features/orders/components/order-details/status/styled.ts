import { Animated } from "react-native";
import styled from "styled-components/native";

export const Card = styled.View`
    width: 100%;
    margin-bottom: 20px;
`;

export const Body = styled.View`
    width: 100%;
    height: 30px;
    margin-top: 5px;
`;

export const Row = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const LineRow = styled(Row)`
    width: 100%;
    height: 100%;
    align-items: center;
    position: relative;
`;

export const Point = styled.TouchableOpacity<{ $bg: boolean }>`
    width: 30px;
    height: 30px;
    background-color: ${({ $bg }) => ($bg ? "#FFCD31" : " #eee")};
    border-radius: 50px;
`;

export const Line = styled.View`
    width: 100%;
    height: 5px;
    background-color: #eee;
    position: absolute;
    z-index: -1;
`;

export const LineProgress = styled(Animated.View)`
    height: 100%;
    background-color: #FFCD31;
`;

export const CancelledContent = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
`;