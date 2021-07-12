import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import {
    Container,
    Icon,
    Title,
} from './styles'

export interface Props extends RectButtonProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionButton({title, type, isActive, ...rest} : Props){
    return(
        <Container
        {...rest}
        isActive={isActive}
        type={type}
        >
            <Icon
            name={icons[type]}
            type={type}
            isActive={isActive}
            />
            <Title isActive={isActive}>
                {title}
            </Title>
        </Container>
    )
}