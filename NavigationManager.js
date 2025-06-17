import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import WelcomePageMobile from './pages/common/WelcomePageMobile';
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';

const Stack = createNativeStackNavigator();

export default function NavigationManager() {
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        const { width } = Dimensions.get('window');
        if (width < 768) {
          // If it's mobile, set initial route to WelcomePageMobile
          setInitialRoute('Welcome');
        } else {
          // If it's desktop, set initial route to LoginPage
          setInitialRoute('Login');
        }
    }, []);

    if (!initialRoute) {
        return null; 
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Welcome" component={WelcomePageMobile} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegistrationPage} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

};