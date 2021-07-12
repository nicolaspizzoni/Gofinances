import "react-native-gesture-handler";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";
import AppLoading from "expo-app-loading";
import {AuthProvider, useAuth} from './src/hooks/auth'
import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const {userStoragedLoading} = useAuth();

  if (!fontsLoaded || userStoragedLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar 
          translucent={true}
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          />
          <AuthProvider>
            <Routes />
          </AuthProvider>
    </ThemeProvider>
  );
}
