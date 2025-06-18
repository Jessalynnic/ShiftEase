import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CommonLayout from '../common/CommonLayout';
import { Ionicons } from '@expo/vector-icons';
import { loginBusiness } from '../../backend/scripts/login';

const { width } = Dimensions.get('window');

export default function LoginPage() {
    const isMobile = width < 768;
    const navigation = useNavigation();
    const [isBusinessLogin, setIsBusinessLogin] = useState(false);

    const [businessEmail, setBusinessEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const switchLogin = (loginType) => {
        setIsBusinessLogin(loginType === 'Business'); // Toggle between Business and Employee Login
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        if (isBusinessLogin) {
            const { success, message } = await loginBusiness(businessEmail, password);

            if (!success) {
                setError(message);
            } else {
                navigation.navigate('Business');
            }
        } else {
            setError('Employee login not implemented yet.');
        }

        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled={isMobile}
        >
            <CommonLayout
                isMobile={isMobile}
                logo={require('../../assets/images/auth/logo_1.png')}
                mainImage={require('../../assets/images/auth/two_women.jpg')}
                customStyles={{
                    mobileBottomContainer: isMobile ? { top: '35%' } : {},
                    mobileLogo: isMobile ? { marginTop: 30 } : {},
                    contentWrapper: !isMobile ? { flexDirection: 'row-reverse' } : {}, // Reverse layout on web
                    desktopImage: !isMobile ? { borderTopRightRadius: 20, borderBottomRightRadius: 20 } : {},
                    inputContainer: !isMobile ? { paddingRight: 0 } : {},
                    formContainer: !isMobile ? { paddingLeft: 40, paddingRight: 40 } : {},
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.employeeButton, isBusinessLogin ? styles.inactiveButton : styles.activeButton,]} onPress={() => switchLogin('Employee')}>
                        <Text style={styles.buttonSwitchText}>Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.businessButton, isBusinessLogin ? styles.activeButton : styles.inactiveButton,]} onPress={() => switchLogin('Business')}>
                        <Text style={styles.buttonSwitchText}>Business</Text>
                    </TouchableOpacity>
                </View>

                {/* Label for the TextInput */}
                <Text style={styles.label}>
                    {isBusinessLogin ? 'Business Email:' : 'Employee ID:'}
                </Text>

                {/* Directly render TextInput components */}
                <TextInput
                    placeholder={isBusinessLogin ? 'Enter Business Email' : ' Enter Employee ID'}
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={isBusinessLogin ? businessEmail : employeeId}
                    onChangeText={isBusinessLogin ? setBusinessEmail : setEmployeeId}
                    style={styles.input}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password:</Text>
                    
                    <TouchableOpacity
                        style={styles.showHideButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry = {!showPassword}
                    style={styles.input}
                />

                {/* Forgot Password */}
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={handleLogin} 
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/* Register Here */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style = {styles.registerText}>Register Here!</Text>
                </TouchableOpacity>

                {error && (
                    <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
                )}

            </CommonLayout>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  employeeButton: {
    width: 100,
    borderTopLeftRadius: 10,    
    borderBottomLeftRadius: 10,
    borderRightWidth: 1,        
    borderRightColor: 'grey',
    padding: 7,
    alignItems: 'center',
  },
  businessButton: {
    width: 100,
    borderTopRightRadius: 10,    
    borderBottomRightRadius: 10,
    padding: 7,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#A9C9D9', // Active button color
  },
  inactiveButton: {
    backgroundColor: 'lightgray', // Inactive button color
  },
  buttonSwitchText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',  
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row', 
  },
  input: {
    width: '100%',
    height: 56,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  showHideButton: {
    position: 'absolute',
    right: 10, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 30,
    backgroundColor: 'rgba(17, 17, 17, 1)',
    width: 200,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
  },
  registerText: {
    marginBottom: 30, 
    fontSize: 13,
    color: 'black',
  }
});