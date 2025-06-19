import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MobileSideMenu from '../../../components/MobileSideMenu';
import { logout } from '../../../backend/scripts/logout';
import BottomMenu from '../../../components/BottomMenu';


export default function BusinessMobile() {
    const navigation = useNavigation();
    const [isManagerDashboard, setIsManagerDashboard] = useState(false);

    const menuItems = [
        { icon: 'home-outline', label: 'Home' },
        { icon: 'person-outline', label: 'My Account' },
        { icon: isManagerDashboard ? 'calendar-outline' : 'briefcase-outline', label: isManagerDashboard ? 'Manage Schedule' : 'Manage Business' },
        { icon: 'person-add-outline', label: 'Add Employee' },
        { icon: 'people-outline', label: 'Manage Employee' },
        { icon: 'create-outline', label: 'Edit Roles' },
        { icon: 'notifications-outline', label: 'Notifications' },
        { icon: 'settings-outline', label: 'Settings' },
        { icon: 'log-out-outline', label: 'Log Out' },
    ];

    const handleMenuItemPress = async (label) => {
        console.log(`${label} pressed!`);
        
        if (label === 'Home') {
            navigation.navigate('Business');
        } else if (label === "My Account") {
            navigation.navigate('MyAccount');
        } else if (label === "Add Employee") {
            navigation.navigate('AddEmployee');
        } else if (label === "Manage Employee") {
            navigation.navigate('ManageEmployee');
        } else if (label === "Log Out") {
            await logout(); 
        }
    };

    const bottomMenuItems = [
        { icon: 'home-outline', label: 'Home' },
        { icon: 'person-outline', label: 'Account' },
        { icon: 'chatbubble-outline', label: 'Messages' },
        { icon: 'notifications-outline', label: 'Notifications' },
    ];

    const handleBottomMenuPress = (label) => {
        console.log(`${label} pressed!`);
        if (label === 'Home') {
            navigation.navigate('Business');
        } else if (label === "Account") {
            navigation.navigate('Business');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style = {styles.topContainer}>
                {/* Top Navigaton Bar */}
                <MobileSideMenu
                    profileName="John Doe"
                    menuItems={menuItems}
                    onMenuItemPress={handleMenuItemPress}
                    logoSrc={require('../../../assets/images/auth/logo_1.png')}
                    profileImageSrc={require('../../../assets/images/icons/default_profile.png')}
                    style={styles.sideMenu}
                />
            </View>

            {/* Bottom Menu */}
            <BottomMenu bottomMenuItems={bottomMenuItems} onPressMenuItem={handleBottomMenuPress} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 20, 
        width: '100%', 
        height: 120, 
    },
    topDashContainer: {
        paddingHorizontal: 20,
        marginTop: 150,
    },
    dashboardContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 80,
    },
    dashboardText: {
        fontSize: 25,
        alignSelf: 'flex-start',
    },
    managerText: {
        alignSelf: 'flex-end',
        margin: 20,
    },
    gradientAnnounce: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginTop: 20, 
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    gradient: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginTop: 20, 
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    spacer: {
        flexGrow: 2, 
        flexShrink: 1, 
    },
    announcements: {
        borderRadius: 10,
        padding: 20,
    },
    addIconContainer: {
        position: 'absolute',
        bottom: -60,
        right: 10,
        zIndex: 1,
    },
    reportsContainer: {
        borderRadius: 10,
        padding: 20,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16
    },
    icon: {
        width: 50,
        height: 50
    },
    icon2: {
        width: 40,
        height: 40
    },
    textBox: {
        flex: 1,
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    messagingContainer: {
        borderRadius: 10,
        padding: 20,
    },
});