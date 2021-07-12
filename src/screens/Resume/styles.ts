import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background}
`;

export const Header = styled.View`
    height: ${RFValue(113)}px;

    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;

    padding: 0 80px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    color: ${({theme}) => theme.colors.shape};

    margin-bottom: 19px;
`;

export const Content = styled.ScrollView``;

export const GraphContainer = styled.View`
    align-items: center;
    width: 100%;
`;

export const MonthSelect = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(30)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;