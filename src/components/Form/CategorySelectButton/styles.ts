import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 18px 16px;
    border-radius: 5px;

    background-color: ${({theme}) => theme.colors.shape}
`;

export const Category = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.text};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text}
`;