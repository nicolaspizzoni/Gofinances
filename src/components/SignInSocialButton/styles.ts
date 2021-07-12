import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    height: ${RFValue(56)}px;

    background-color: ${({theme}) => theme.colors.shape};
    
    margin-bottom: 16px;

    border-radius: 5px;
`;

export const ImageContainer = styled.View`
    height: 100%;

    padding: ${RFValue(16)}px;

    justify-content: center;
    align-items: center;

    border-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;
`;

export const Text = styled.Text`
    flex: 1;
    text-align: center;
    
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.title};
`;
