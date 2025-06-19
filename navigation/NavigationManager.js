import { View, Text, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginPage from '../pages/auth/LoginPage';
import RegistrationPage from '../pages/auth/RegistrationPage';
import BusinessPage from '../pages/business/BusinessPage';
import BusinessMobile from '../pages/business/mobile/BusinessMobile';
import DebugScreen from '../pages/DebugPage';

const Stack = createNativeStackNavigator();

export default function NavigationManager() {
  const { session, loading } = useAuth();

  const { width } = Dimensions.get('window');
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android' || width < 768;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegistrationPage} />
          </>
        ) : isMobile ? (
          <Stack.Screen name="BusinessMobile" component={BusinessMobile} />
        ) : (
          <Stack.Screen name="Business" component={BusinessPage} />
        )}

        <Stack.Screen name="Debug" component={DebugScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}