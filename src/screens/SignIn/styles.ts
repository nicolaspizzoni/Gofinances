import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;

    align-items: center;
    justify-content: flex-end;

    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${getStatusBarHeight() + 10}px;
`;

export const TitleWrapper = styled.View`
    align-items: center;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;

    text-align: center;

    margin-top: 45px;
`;

export const SignInTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;

    text-align: center;

    margin-top: 80px;
    margin-bottom: 67px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;

    background-color: ${({theme}) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;

    justify-content: space-between;
`;
