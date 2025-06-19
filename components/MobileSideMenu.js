import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MobileSideMenu({ profileName, menuItems, onMenuItemPress, logoSrc, profileImageSrc }) { 
    const windowHeight = Dimensions.get('window').height;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <View style={{ flex: 1 }}>
        {/* Top Navigation Bar */}
        <LinearGradient 
            colors={['#E7E7E7', '#9DCDCD']} 
            style={styles.topBarContainer}
        >
            <View style={styles.menuIconWrapper}>
                {isMenuOpen ? (
                    <View style={{ width: 30 }} /> 
                ) : (
                    <TouchableOpacity onPress={toggleMenu}>
                        <Image
                        source={require('../assets/images/icons/menu_icon.png')}
                        style={styles.menuIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
          
  
          {/* Company logo */}
          <Image
            resizeMode="contain"
            source={logoSrc}
            style={styles.logo}
          />
        </LinearGradient>
  
        {/* Side Menu */}
        {isMenuOpen && (
          <View style={[styles.sideMenu, { height: windowHeight }]}>
            <TouchableOpacity style={styles.backArrow} onPress={toggleMenu}>
                <Ionicons name={"chevron-back"} size={30} color="#FFFFFF"/>
            </TouchableOpacity>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={profileImageSrc}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{profileName}</Text>
            </View>
  
            {/* Dynamic Menu Items */}
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => onMenuItemPress(item.label)}
              >
                <Ionicons name={item.icon} size={30} color="#A7CAD8" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    topBarContainer: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    menuIconWrapper: {
        width: 15, 
        alignItems: 'flex-start',
    },
    menuIcon: {
        width: 15,
        height: 15,
    },
    logo: {
        width: 140,
        height: 140,
    },
    sideMenu: {
        position: 'absolute',  // Ensure it overlays the main content
        top: 0,               // Aligns the top of the screen
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        width: '50%',
        height: 700,
        zIndex: 20,   
        paddingTop: 70,
        paddingHorizontal: 20
    },
    backArrow: {
        alignSelf: 'flex-end', 
        left: 15, 
        marginBottom: 20
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileName: {
        color: 'white',
        marginLeft: 15,
        fontSize: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuItemText: {
        color: '#A7CAD8',
        marginLeft: 10,
        fontSize: 15,
    },
});