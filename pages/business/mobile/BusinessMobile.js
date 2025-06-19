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

            <View style={styles.scrollWrapper}>
                <ScrollView 
                    contentContainerStyle={styles.scrollViewContainer}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topDashContainer}>
                        {/* Conditionally render the dashboard text based on state */}
                        <Text style={styles.dashboardText}>
                            {isManagerDashboard ? 'Manager Dashboard' : 'Business Dashboard'}
                        </Text>

                        <View style={styles.dashboardContainer}>

                            {/* Announcements Section */}
                            <LinearGradient
                                colors={['#E7E7E7', '#A7CAD8']} 
                                style={styles.gradientAnnounce}
                            >
                                <View style={styles.announcements}>
                                    <View style={styles.topBar}>
                                        <Text style={styles.sectionTitle}>Announcements</Text>
                                
                                        <View style={styles.spacer} />
                                    
                                        <Ionicons name="megaphone-outline" size={30} color="black" />
                                    </View>

                                    <View style={styles.textBox}>
                                        <Text style={{ color: 'black' }}>No announcements right now.</Text>
                                    </View>

                                    <TouchableOpacity style={styles.addIconContainer}>
                                        <Ionicons name="add-circle" size={50} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>

                            {/* Reports Section */}
                            <LinearGradient
                                colors={['#E7E7E7', '#A7CAD8']} 
                                style={styles.gradient}
                            >
                                <View style={styles.reportsContainer}>
                                    <View style={styles.topBar}>
                                        <Text style={styles.sectionTitle}> Daily Reports</Text>
                                        
                                        <View style={styles.spacer} />
                                        
                                        <Ionicons name="document-text-outline" size={30} color="black" />
                                    </View>
                                    <View style={styles.textBox}>
                                        <Text style={{ color: 'black' }}>No reports created.</Text>
                                    </View>
                                </View>
                            </LinearGradient>

                            {/* Performance Section */}
                            <LinearGradient 
                                colors={['#E7E7E7', '#A7CAD8']} 
                                style={styles.gradient}
                            >
                                <View style={styles.performanceContainer}>
                                    <View style={styles.topBar}>
                                        <Text style={styles.sectionTitle}>Key Performance Overview</Text>
                                        
                                        <View style={styles.spacer} />

                                        <Ionicons name="bar-chart-outline" size={30} color="black" />
                                    </View>
                                    <View style={styles.textBox}>
                                        <Text style={{ color: 'black' }}>Performance data not available.</Text>
                                    </View>
                                </View>  
                            </LinearGradient>
                        </View>

                        
                    </View>
                </ScrollView>
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
    scrollWrapper: {
        height: '89%',
    },
    scrollViewContainer: {
        paddingVertical: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        gap: 20
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
        minHeight: 120,
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
    textBox: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    performanceContainer: {
        borderRadius: 10,
        padding: 20,
    },
});