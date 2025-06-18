import React, { use, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import BusinessPage from '../pages/business/BusinessPage';
import DebugScreen from '../pages/DebugPage';

const Stack = createNativeStackNavigator();

export default function NavigationManager() {
    const { session, loading } = useAuth();

    // useEffect(() => {
    //     console.log('Session changed:', session);
    // }, [session]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {session ? (
                    <Stack.Screen name="Business" component={BusinessPage} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="Register" component={RegistrationPage} />
                    </>
                )}
                <Stack.Screen name="Debug" component={DebugScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

};