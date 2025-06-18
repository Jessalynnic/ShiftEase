import React, { use, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './context/AuthContext';

import { Dimensions } from 'react-native';
import WelcomePageMobile from './pages/common/WelcomePageMobile';
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import BusinessPage from './pages/business/BusinessPage';

const Stack = createNativeStackNavigator();

export default function NavigationManager() {
    const { session, loading } = useAuth();
    const [initialRoute, setInitialRoute] = useState(null);
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const { width } = Dimensions.get('window');
        setIsMobile(width < 768);
    }, []);

    useEffect(() => {
        if (session) {
        setInitialRoute('Business');
        } else if (isMobile !== null) {
        setInitialRoute(isMobile ? 'Welcome' : 'Login');
        }
    }, [session, isMobile]);

    // Wait for initialRoute to be determined
    if (!initialRoute) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                {session ? (
                    <Stack.Screen name="Business" component={BusinessPage} options={{ headerShown: false }}/>
                ) : (
                    <>
                        <Stack.Screen name="Welcome" component={WelcomePageMobile} options={{ headerShown: false }}/>
                        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
                        <Stack.Screen name="Register" component={RegistrationPage} options={{ headerShown: false }}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

};