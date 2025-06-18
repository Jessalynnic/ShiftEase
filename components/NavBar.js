import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { logout } from '../backend/scripts/logout';

const { width } = Dimensions.get('window');

export default function NavBar({ homeRoute, showLogout }) {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const { business: loggedInBusiness } = useAuth();

    // console.log('Logged in business: ', loggedInBusiness);

    return (
        <LinearGradient
            colors={['#E7E7E7', '#9DCDCD']} 
            style={styles.topBarContainer}
        >
            <Image
                resizeMode="contain"
                source={require('../assets/images/auth/logo_1.png')}
                style={styles.desktopLogo}
            />

            <View style={styles.spacer} />

            <View style = {styles.navBarContainer}>
                {/* Home Button */}
                <TouchableOpacity onPress={() => navigation.navigate(homeRoute)}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                {/* Settings Button */}
                {loggedInBusiness && (
                    <TouchableOpacity>
                        <Text style={styles.navText}>Settings</Text>
                    </TouchableOpacity>
                )}

                {/* Account Button */}
                <TouchableOpacity>
                    <Text style={styles.navText}>Account</Text>
                </TouchableOpacity>

                <View style={{ position: 'relative', zIndex: 1000 }}>
                    {/* Notifications Button */}
                    <TouchableOpacity>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/images/icons/notification_icon_trans.png')}
                            style={styles.notificationIcon}
                        />
                    </TouchableOpacity>

                    {showNotifications && (
                        <View style={styles.notificationDropdown}>
                            <ScrollView>
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <View key={notification.id} style={styles.notificationItem}>
                                            <Text style={styles.notificationText}>{notification.content}</Text>
                                            <Text style={styles.notificationDate}>
                                                {new Date(notification.timestamp).toLocaleString()}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.noNotificationsText}>No notifications</Text>
                                )}
                            </ScrollView>
                        </View>
                    )}
                </View>
                
                {/* Messages Button */}
                <TouchableOpacity>
                    <Image
                        resizeMode="contain"
                        source={require('../assets/images/icons/messages_icon.png')}
                        style={styles.notificationIcon}
                    />
                </TouchableOpacity>
                
                {/* Logout Button */}
                {showLogout && (
                    <TouchableOpacity 
                        style={styles.logOutButton} 
                        onPress={async () => {
                            await logout();
                        }}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                )}

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    topBarContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        zIndex: 1000,
    },
    desktopLogo: {
        width: 230,
        height: 230,
        marginTop: 17,
    },
    spacer: {
        flexGrow: 2, 
        flexShrink: 1, 
    },
    navBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 1,
    },
    navText: {
        fontSize: 16,
        marginRight: 20, // Adds space between the nav items
    },
    notificationIcon: {
        width: 25,
        height: 25,
        marginRight: 20,
    },
    notificationDropdown: {
        position: 'absolute',
        top: 35,
        right: 0,
        width: 200,
        maxHeight: 200,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        padding: 10, 
        zIndex: 1100,
    },
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
    },
    notificationText: {
        fontSize: 14,
        color: '#333',
    },
    notificationDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    noNotificationsText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        paddingVertical: 10,
    },
    logOutButton: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 90,
        height: 27,
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: '500',
      },
});