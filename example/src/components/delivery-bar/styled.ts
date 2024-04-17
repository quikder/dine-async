import styled from "styled-components/native";

export const Bar = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const Content = styled.View`
    width: 300px;
    border-radius: 50px;
    background-color: ${({ theme }) => `${theme.colors.primary}40`};
`;
