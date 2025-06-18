import React, { useState, useEffect } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonLayout from '../common/CommonLayout';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerBusiness } from '../../backend/scripts/registration';

const { width } = Dimensions.get('window');

export default function RegistrationPage() {
    const isMobile = width < 768;
    const navigation = useNavigation();

    const [businessId, setBusinessId] = useState(null);
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        setError(null);
        setLoading(true);

        if (!businessName || !businessEmail || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        const { success, message, data } = await registerBusiness(businessName, businessEmail, password);

        if (!success) {
            setError(message);
            setShowSuccessMessage(false);
            setBusinessId(null);
        } else {
            await AsyncStorage.setItem('pendingBusinessName', businessName);

            setShowSuccessMessage(true);
            setError(null);

            await supabase.auth.signOut();
        }

        setLoading(false);
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
            navigation.navigate('Login');
            }, 7000); // 7 seconds

            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage, navigation]);

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={isMobile}
        >
            <CommonLayout
                isMobile={isMobile}
                logo={require('../../assets/images/auth/logo_1.png')}
                mainImage={require('../../assets/images/auth/woman.png')}
                customStyles={{
                    mobileBottomContainer: isMobile ? { top: '25%' } : {},
                    inputContainer: !isMobile ? { paddingRight: 0, borderLeftTopRadius: 20, borderLeftBottomRadius: 20, } : {},
                    formContainer: !isMobile ? { paddingLeft: 40, paddingRight: 40 } : {},
                    desktopImage: !isMobile ? { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 } : {},
                    desktopLogo: !isMobile ? {height: 90} : {},
                    imageContainer: !isMobile ? {borderLeftTopRadius: 20, borderLeftBottomRadius: 20,} : {},
                }}
            >
                <Text style={styles.label}>Business Name</Text>
                <TextInput
                    editable={!loading}
                    placeholder="Enter your business name"
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={businessName}
                    onChangeText={setBusinessName}
                    style={styles.input}
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    editable={!loading}
                    placeholder="Enter your email"
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={businessEmail}
                    onChangeText={setBusinessEmail}
                    keyboardType='email-address'
                    style={styles.input}
                />

                <View style={styles.passContainer}>
                    <Text style={styles.label}>Password</Text>

                    <TouchableOpacity
                        style={styles.showHideButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    editable={!loading}
                    placeholder="Enter your password"
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />

                <View style={styles.passContainer}>
                    <Text style={styles.label}>Confirm Password</Text>  

                    <TouchableOpacity
                        style={styles.showHideButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <TextInput
                    editable={!loading}
                    placeholder="Confirm your password"
                    placeholderTextColor={isMobile ? 'gray' : 'lightgray'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />

                {/* Register Button */}
                <TouchableOpacity 
                    style={[styles.registerButton, loading && { opacity: 0.6 }]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Registering...' : 'Register'}
                    </Text>
                </TouchableOpacity>

                {/* Back to Login */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Back to Login!</Text>
                </TouchableOpacity>

                {error && (
                    <Text style={styles.errorMessage}>{error}</Text>
                )}

                {showSuccessMessage && (
                    <Text style={styles.successMessage}>
                        Registration successful!{'\n'}Check your email to confirm and then log in.
                    </Text>
                )}
            </CommonLayout>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  passContainer: {
    width: '100%',
    flexDirection: 'row', 
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',  
    alignSelf: 'flex-start',
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
  eyeIcon: {
    width: 24,
    height: 24,
    marginRight: 3,
  },
  showHideText: {
    fontSize: 16,
    color: "rgba(102, 102, 102, 1)",
  },
  registerButton: {
    borderRadius: 30,
    backgroundColor: 'rgba(17, 17, 17, 1)',
    width: 200,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
  },
  loginText: {
    marginBottom: 30,
    fontSize: 13,
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: 10,
    marginBottom: 40,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 16,
  },
});