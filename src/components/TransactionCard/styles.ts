import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'

interface TransactionProps {
    type: 'positive' | 'negative';
}

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};

    border-radius: 5px;
    width: 100%;
    padding: 18px 24px;
    margin-bottom: 16px;
`
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.title}
`;
export const Amount = styled.Text<TransactionProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;

    margin-top: 2px;

    ${({type}) => type === 'positive' && css`
        color: ${({theme}) => theme.colors.success}
    `}

    ${({type}) => type === 'negative' && css`
        color: ${({theme}) => theme.colors.attention}
    `}
`;
export const Footer = styled.View`
    flex-direction: row;
    margin-top: ${RFValue(20)}px;

    align-items: center;
    justify-content: space-between;
`;
export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text}
`;
export const CategoryName = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    margin-left: 17px;

    color: ${({theme}) => theme.colors.text}
`;
export const TransactionDate = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.text}
`;