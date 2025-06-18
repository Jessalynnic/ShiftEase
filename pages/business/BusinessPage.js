import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/NavBar';
import { logout } from '../../backend/scripts/logout';

const { width } = Dimensions.get('window');

export default function BusinessPage() {
    const navigation = useNavigation();
    const [isManagerDashboard, setIsManagerDashboard] = useState(false);

    return (
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                <NavBar homeRoute={'Business'} showLogout={true}/>

                <View style={styles.topContainer}>

                    {/* Conditionally render the dashboard text based on state */}
                    <Text style={styles.dashboardText}>
                        {isManagerDashboard ? 'Manager Dashboard' : 'Business Dashboard'}
                    </Text>
                </View>
                {/* <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  logoutButton: {
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
  logoutText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1, 
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
    minHeight: '100%',
    height: 200,
    minWidth: 950,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
  },
  managerText: {
    fontSize: 16,
    paddingRight: 50
  },
  dashboardContainer: {
    flexGrow: 1,
    width: '95%',
    maxWidth: 1200,
    flexDirection: 'row', // Two columns layout
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  dashboardText: {
    fontSize: 25,
    alignSelf: 'flex-start',
    //marginTop: 40,
    paddingLeft: 60
    
  },
  spacer: {
    flexGrow: 2, // Grow dynamically to fill space
    flexShrink: 1, // Shrink if space is limited
  },
  icon: {
    width: 50,
    height: 50
  },
  icon2: {
    width: 40,
    height: 40
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftPane: {
    flex: 2,
    justifyContent: 'space-between',
    paddingTop: 20,
    maxWidth: 300,
    minWidth: 250,
  },
  rightPane: {
    flex: 2,
    height: '100%',
    paddingTop: 20,
    maxWidth: 450,
    minWidth: 450,
    alignItems: "flex-end",
  },
  gradient: {
    width: '100%',
    height: 300,
    borderRadius: 10, 
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  gradientAnnounce: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20, 
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  announcements: {
    borderRadius: 10,
    padding: 20,
  },
  addIconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    right: 10,
  },
  addIconContainer2: {
    position: 'absolute',
    bottom: -150,
    right: 10,
    zIndex: 1,
  },
  sideContainer: {
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16
  },
  textBox: {
    minheight: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  messagingHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messagingBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  bottomBarContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  desktopLogo: {
    position: 'relative',
    left: 40,
    width: 230,
    height: 100,
    alignSelf: 'flex-end',
  },
  announcementBox: {
    minheight: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
},
announcementTitle: {
    left: 10,
    fontSize: 16,
    fontWeight: '600',
},
announcementContent: {
    left: 10,
    fontSize: 14,
},
HDivider: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
    width: '98%',
    alignSelf: 'center',
},
topBarIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
},
});