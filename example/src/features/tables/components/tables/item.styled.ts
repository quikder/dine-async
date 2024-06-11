import styled from "styled-components/native";
import { useWidth } from "verity-quik";

export const Body = styled.TouchableOpacity<BodyProps>`
    width: ${({ $width }) =>
			useWidth($width, "100%", "30%", "19%", "15.4%", "12.4%")}; 
    margin-right: ${({ $width }) =>
			useWidth($width, 0, "4%", "5%", "1.2%", "2.1%")};
    aspect-ratio: 1;
    margin-bottom: 15px;  
    background-color: ${({ $isAvailable, theme }) =>
			$isAvailable ? theme.colors.success : theme.colors.error};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const Capacity = styled.View`
    width: 100%;
    position: absolute;
    top: 2px;
    left: 5px;
`;

interface BodyProps {
	$width: number;
	$isAvailable: boolean;
}
