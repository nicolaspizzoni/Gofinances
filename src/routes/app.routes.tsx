import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons'

import { Dashboard } from '../screens/Dashboard';
import { Resume } from '../screens/Resume';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
    const theme = useTheme();

    return(
        <Navigator tabBarOptions= {{
            activeTintColor: theme.colors.secondary,
            inactiveTintColor: theme.colors.text,
            labelPosition: "beside-icon",
            style: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 60
            }
        }}>
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({color, size}) => (
                        <MaterialIcons
                            size={size}
                            color={color}
                            name="attach-money"
                        />
                    ))
                }}
            />
            <Screen 
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({color, size}) => (
                        <MaterialIcons
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    )
}