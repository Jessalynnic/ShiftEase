import { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Picker } from 'react-native';
import { getBusinessRoles } from '../../backend/scripts/roles';

const { width } = Dimensions.get('window');

export default function AddEmpModal({ addEmpVisible, setAddEmpVisible, businessId }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const [first_name, set_first_name] = useState('');
    const [last_name, set_last_name] = useState('');
    const [dob, set_dob] = useState('');
    const [email_address, set_email_address] = useState('');
    const [ssn, set_ssn] = useState('');

    const [role, setRole] = useState('Select Role');
    const [roles, setRoles] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState('Select Role');
    const [employment_type, set_employment_type] = useState('Select Employment Type');
    
    const handleDOBChange = (text) => {
        // Remove non-digits
        const digits = text.replace(/\D/g, '');

        // Format as MM/DD/YYYY
        let formatted = '';
        if (digits.length <= 2) {
            formatted = digits;
        } else if (digits.length <= 4) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else if (digits.length <= 8) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
        } else {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
        }

        set_dob(formatted);
    };
    
    const fetchRoles = async () => {
        console.log('Business id:', businessId);
        if (!businessId) {
            console.warn('No businessId provided when fetching roles');
            return;
        }

        try {
            const data = await getBusinessRoles(businessId);
            setRoles(data);
        } catch (error) {
            console.error('❌ Error in fetchRoles:', error.message);
            alert('Failed to fetch roles');
        }
    };

    // Call fetchRoles when the modal is opened
    useEffect(() => {
        if (addEmpVisible) {
        fetchRoles();
        }
        console.log('Roles: ', roles);
    }, [addEmpVisible]);
    
    const handleSelectRole = (selectedRole) => {
        setRole(selectedRole);
        setIsDropdownVisible(false);
    };
    
    const confirmCancel = () => {
        setIsModalVisible(false);
        setAddEmpVisible(false);
    };
        
    const cancel = () => {
        setIsModalVisible(false);
        setAddEmpVisible(false);
    };


    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addEmpVisible}
                onRequestClose={() => setAddEmpVisible(false)}
            >
                <View style={styles.grayBackground}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Add Employee</Text>

                        <View style={styles.horizontalDivider} />

                        <View style={styles.rowContainer}>
                            <Image style={styles.userImage} source={require('../../assets/images/icons/add_employee_icon.png')} resizeMode="contain" /> 

                            <View style={styles.verticalDivider} />

                            <View style={styles.inputContainer}>
                                {/* First Row */}
                                <View style={styles.inputRow}>
                                    {/* First Name */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>First Name</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="Ex: 'John'" 
                                            value={first_name} 
                                            onChangeText={set_first_name} 
                                        />
                                    </View>

                                    {/* Last Name */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>Last Name</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="Ex: 'Smith'" 
                                            value={last_name} 
                                            onChangeText={set_last_name} 
                                        />
                                    </View>
                                </View>

                                {/* Second Row */}
                                <View style={styles.inputRow}>
                                    {/* Date of Birth */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>Date of Birth</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="MM/DD/YYYY" 
                                            value={dob} 
                                            onChangeText={handleDOBChange} 
                                            keyboardType="number-pad"
                                        />
                                    </View>

                                    {/* Email Address */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>Email Address</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="example@email.com" 
                                            value={email_address} 
                                            onChangeText={set_email_address} 
                                        />
                                    </View>
                                </View>

                                {/* Third Row */}
                                <View style={styles.inputRow}>
                                    {/* Role */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>Role</Text>
                                        <Picker
                                            selectedValue={selectedRoleId}
                                            style={styles.input}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedRoleId(itemValue);
                                            }}
                                        >
                                            <Picker.Item label="Select Role" value={null} />
                                            {roles.map((role) => (
                                                <Picker.Item key={role.role_id} label={role.role_name} value={role.role_id} />
                                            ))}
                                        </Picker>
                                    </View>

                                    {/* Last 4 SSN */}
                                    <View style={styles.inputContents}>
                                        <Text style={styles.label}>Last 4 Digits of SSN</Text>
                                        <TextInput 
                                            style={styles.input} 
                                            placeholder="Enter last 4 of SSN" 
                                            value={ssn} 
                                            onChangeText={set_ssn} 
                                        />
                                    </View>

                                    {/* Employment Type Dropdown */}
                                    <View style={styles.employmentTypeContainer}>
                                        <Text style={styles.label}>Employment Type</Text>
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={employment_type}
                                                onValueChange={(itemValue) => set_employment_type(itemValue)}
                                                style={styles.input}
                                            >
                                                <Picker.Item label="Select Employment Type" value="Select Employment Type" />
                                                <Picker.Item label="Full-Time" value="Full-Time" />
                                                <Picker.Item label="Part-Time" value="Part-Time" />
                                            </Picker>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    {/* Add Button */}
                                    <TouchableOpacity style={styles.bubbleButton} onPress={""}>
                                        <Text style={styles.buttonText}>Add User</Text>
                                    </TouchableOpacity>
                                    
                                    {/* Cancel Button */}
                                    <TouchableOpacity style={styles.bubbleButton} onPress={cancel}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            
            {/* Confirmation Modal */}
            <Modal 
                transparent={true}
                visible={isModalVisible} // Show the confirmation modal
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.header}>Are you sure you want to cancel?</Text>
                        
                        <View style={styles.horizontalDivider}/>

                        <Text style={styles.modalText}>All information inputted will be lost.</Text>

                        <View style={styles.horizontalDivider}/>

                        <View style={styles.modalButtonContainer}>
                            {/* Yes Button */}
                            <TouchableOpacity style={styles.bubbleButton} onPress={confirmCancel}>
                                <Text style={styles.optionText}>Yes</Text>
                            </TouchableOpacity>
                            
                            {/* No Button */}
                            <TouchableOpacity style={styles.bubbleButton} onPress={cancel}>
                                <Text style={styles.optionText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create ({
    grayBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20
    },
    container: {
        width: '100%',
        maxWidth: 1400,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20
    },
    header: {
        fontSize: 40,
        paddingHorizontal: 20,
        paddingTop: 15,
        fontWeight: '400',
    },
    horizontalDivider: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        marginVertical: 20,
        width: '98%',
        alignSelf: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    inputContainer: {
        flex: 1,
        padding: 10,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputContents: {
        flex: 1,
        marginHorizontal: 5,
    },
    userImage: {
        width: 300,
        height: 300,
    },
    verticalDivider: {
        width: 1,
        height: '80%',
        backgroundColor: 'gray',
        marginHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        color: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    employmentTypeContainer: {
        alignSelf: 'flex-start', 
        marginLeft: 10,         
        width: '30%',           
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 30,
        top: 25
    },
    bubbleButton: {
        borderRadius: 50,
        backgroundColor: "#9FCCF5",
        width: 100,
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        marginHorizontal: 10
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        width: '50%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
    },
});