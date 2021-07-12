import styled, {css} from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import {Props} from '.'

interface ContainerProps {
    type: 'up' | 'down';
    isActive: boolean;
}

interface TextProps {
    isActive: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
    flex-direction: row;
    width: 48%;

    justify-content: center;
    align-items: center;

    border-color: ${({theme}) => theme.colors.text};

    border-radius: 5px;

    background-color: ${({theme}) => theme.colors.background_gray};

    ${({type, isActive}) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light}
    `}

    ${({type, isActive}) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light}
    `}

    padding: 18px 36px;
`;

export const Icon = styled(Feather)<Props>`

    ${({type, isActive}) => type === 'up' && css`
        color: ${({theme}) => (
            isActive ? theme.colors.success :
            theme.colors.success_light
        )}
    `}

    ${({type, isActive}) => type === 'down' && css`
        color: ${({theme}) => (
            isActive ? theme.colors.attention :
            theme.colors.attention_light
        )}
    `}

    font-size: ${RFValue(24)}px;
    margin-right: 12px;
`;

export const Title = styled.Text<TextProps>`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};

    color: ${({isActive, theme}) => (
        isActive ? theme.colors.title : theme.colors.text
    )}
`;
