import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../../components/NavBar';
import SidebarButton from '../../components/SidebarButton';


const { width } = Dimensions.get('window');

export default function BusinessPage() {
    const navigation = useNavigation();
    const [isManagerDashboard, setIsManagerDashboard] = useState(false);
    const [pulledGeneralAnnouncement, setPulledGeneralAnnouncement] = useState([]);

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

                <View style={styles.dashboardContainer}>
                  {/* Left Column */}
                  <View style={styles.leftPane}>
                    {/* Manage Schedule Button */}
                    <SidebarButton 
                      icon={require('../../assets/images/icons/calendar_with_gear.png')}
                      label= 'Manage Schedule'
                      onPress={() =>  ("")}
                      customContainerStyle={{ right: -10 }}
                    />

                    {/* Add Employee Button */}
                    <SidebarButton
                      icon={require('../../assets/images/icons/add_employee_icon.png')}
                      label="Add Employee"
                      onPress={() => ("")} // Open the Add Employee Modal
                      customContainerStyle={{ right: -10 }}
                    />

                    {/* Manage Employee Button */}
                    <SidebarButton
                      icon={require('../../assets/images/icons/employees_talking.png')}
                      label="Manage Employee"
                      onPress={() => ("")} // Navigate to ManageEmployeePage
                      customContainerStyle={{ right: 10 }}
                    />

                    {/* Edit Roles Button */}
                    <SidebarButton
                      icon={require('../../assets/images/icons/edit_roles_icon.png')}
                      label="Edit Roles"
                      onPress={() => ("")}
                      customContainerStyle={{ right: 10 }}
                    />
                  </View>

                  <View style={styles.spacer} />

                  {/* Right Column */}
                  <View style={styles.rightPane}>
                    {/* Announcements Section */}
                    <LinearGradient
                      colors={['#E7E7E7', '#A7CAD8']}
                      style={styles.gradientAnnounce}
                    >
                      <View style={styles.announcements}>
                        <View style={styles.topBar}>
                          <Text style={styles.sectionTitle}>Announcements</Text>

                          <View style={styles.spacer} />

                          <View style={styles.topBarIcons}>
                              <TouchableOpacity style={styles.addIconContainer}>
                                <Ionicons name="add-circle" size={28} color="black" onPress={() => ("")} />
                              </TouchableOpacity>

                              <Ionicons name="megaphone-outline" size={25} color="black" />
                          </View>
                        </View>

                        <TouchableOpacity style={styles.announcementBox} onPress={() => ("")}>
                          {pulledGeneralAnnouncement.length === 0 ? (
                            <Text style={{alignSelf: 'center'}}>No announcements at the moment.</Text>
                          ) : (
                            <View>
                                <Text style={styles.announcementTitle}>{pulledGeneralAnnouncement[0].Title}</Text>
                                <View style={styles.HDivider}/>
                                <Text style={styles.announcementContent}>{pulledGeneralAnnouncement[0].Content}</Text>
                            </View>
                          )}
                        </TouchableOpacity>

                      </View>
                    </LinearGradient>

                    {/* Requests Section */}
                    <LinearGradient 
                      colors={['#E7E7E7', '#A7CAD8']} 
                      style={styles.gradient}
                    >
                      <View style={styles.sideContainer}>
                        <View style={styles.topBar}>
                          <Text style={styles.sectionTitle}>Requests</Text>
                          <View style={styles.spacer} />
                          <Ionicons name="hourglass-outline" size={30} color="black" />
                        </View>
                        <View style={[styles.textBox, { height: 150 }]}>
                          <Text style={{alignSelf: 'center'}}>No requests at the moment.</Text>
                        </View>
                        <View style={{width: '100%', alignSelf: 'flex-end', marginTop: 10,}}>
                          <TouchableOpacity>
                            <Text style={{alignSelf: 'flex-end'}}>View All Requests</Text>
                          </TouchableOpacity>
                        </View>  
                      </View>
                    </LinearGradient>

                    {/* Reports Section */}
                    <LinearGradient 
                      colors={['#E7E7E7', '#A7CAD8']} 
                      style={styles.gradient}
                    >
                      <View style={styles.sideContainer}>
                        <View style={styles.topBar}>
                          <Text style={styles.sectionTitle}>Daily Reports</Text>
                          <View style={styles.spacer} />
                          <Ionicons name="document-text-outline" size={30} color="black" />
                        </View>
                        <View style={styles.textBox}>
                          <Text>This feature is not yet implemented. Coming soon!</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 50,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  dashboardText: {
    fontSize: 25,
    alignSelf: 'flex-start',
    paddingLeft: 60
    
  },
  spacer: {
    flexGrow: 2, 
    flexShrink: 1,
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
    marginTop: 20,
    height: '80%',
    maxWidth: 300,
    minWidth: 250,
  },
  rightPane: {
    flex: 2,
    height: '100%',
    marginTop: 20,
    maxWidth: 450,
    minWidth: 450,
    alignItems: "flex-end",
  },
  gradient: {
    width: '100%',
    minHeight: 200,
    //height: 300,
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
    //minHeight: 100,
    height: 200,
    borderRadius: 10,
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