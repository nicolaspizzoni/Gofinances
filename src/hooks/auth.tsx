import React, {useState, useContext, createContext, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStoragedLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [userStoragedLoading, setUserStoragedLoading] = useState(true)

    const userDataKey = '@gofinance:user';

async function signInWithGoogle(){
    try {
        const result = await Google.logInAsync({
            iosClientId: '428896677754-1d2usnpl0c7cj0bcflh8bs9qlrvrrrvs.apps.googleusercontent.com',
            androidClientId: '428896677754-abu4msi6t433vlb5q13k5rba9pjbp8sf.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        })

        if(result.type === 'success'){
            const userLogged = {
                id: String(result.user.id),
                email: result.user.email!,
                name: result.user.name!,
                photo: result.user.photoUrl!,
            }
            console.log(userLogged);

            setUser(userLogged);
            await AsyncStorage.setItem(userDataKey, JSON.stringify(userLogged));
        }

    } catch (error) {
        throw new Error(error)
    }
}

async function signInWithApple(){
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL
            ]
        })

        if(credential){
            const name = credential.fullName!.givenName!;
            const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
            
            const userLogged = {
                id: String(credential.user),
                email: credential.email!,
                name,
                photo,
            }
            setUser(userLogged)
            await AsyncStorage.setItem(userDataKey, JSON.stringify(userLogged))
        }

    } catch (error) {
        throw new Error(error)
    }
}

async function signOut(){
    setUser({} as User)
    await AsyncStorage.removeItem(userDataKey)
}

useEffect(() => {
    async function loadUserStoragedData() {
        const userStoraged = await AsyncStorage.getItem(userDataKey);
        if(userStoraged){
            const userLogged = JSON.parse(userStoraged) as User;
            setUser(userLogged)
        }

        setUserStoragedLoading(false)
    }

    loadUserStoragedData()
}, [])

    return(
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithApple,
            signOut,
            userStoragedLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context =  useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth}