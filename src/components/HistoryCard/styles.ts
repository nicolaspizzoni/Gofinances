import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

interface StyleProps {
    color: string;
}

export const Container = styled.View<StyleProps>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(20)}px ${RFValue(13)}px;

    margin-bottom: 8px;

    border-radius: 5px;
    border-left-width: 4px;
    border-color: ${({color}) => color};

    background-color: ${({theme}) => theme.colors.shape};
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;

    color: ${({theme}) => theme.colors.title};
`;

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;

    color: ${({theme}) => theme.colors.title};
`;
