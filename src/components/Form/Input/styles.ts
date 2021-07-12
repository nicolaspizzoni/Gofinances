import styled from 'styled-components/native'
import { TextInput } from 'react-native'


export const Container = styled(TextInput)`
    background-color: ${({theme}) => theme.colors.shape};
    color: ${({theme}) => theme.colors.title};
    width: 100%;

    border-radius: 5px;
    padding: 18px 16px;
    margin-bottom: 8px;

    font-family: ${({theme}) => theme.fonts.regular};
`;