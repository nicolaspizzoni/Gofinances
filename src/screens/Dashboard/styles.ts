import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import {FlatList} from 'react-native'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { BorderlessButton } from 'react-native-gesture-handler'

import {DataProps} from '.'

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background}
`

export const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${RFPercentage(44)}px;

    justify-content: center;
    align-items: flex-start;

    background-color: ${({theme}) => theme.colors.primary}
`

export const UserWrapper = styled.View`
    width: 100%;

    padding: 0 24px;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`
export const Photo = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: 10px;
`
export const User = styled.View`
    margin-left: 17px;
`
export const UserGrettings = styled.Text`
    color: ${({theme}) => theme.colors.shape};

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`
export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};

    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
`

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};

    font-size: ${RFValue(24)}px;
`;

export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
})`
    width: 100%;

    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};

    font-size: ${RFValue(18)}px;
    margin-bottom: 16px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`

export const TransactionList = styled(
    FlatList as new () => FlatList<DataProps>
    ).attrs({
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    }
})``