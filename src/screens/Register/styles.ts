import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    color: ${({theme}) => theme.colors.shape};

    margin-bottom: 19px;

`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;

    padding: 24px;
`;

export const Fields = styled.View`

`

export const TransactionsType = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 16px;
`