import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';

const Stack = createStackNavigator();

export function AuthRoutes(){
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    )
}