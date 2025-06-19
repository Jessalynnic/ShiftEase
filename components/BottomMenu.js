import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BottomMenu({ bottomMenuItems, onPressMenuItem }) { 
    return (
      <View style={styles.bottomMenu}>
        {bottomMenuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => onPressMenuItem(item.label)}>
            <Ionicons name={item.icon} size={25} color="black" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
};

const styles = StyleSheet.create({
    bottomMenu: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#E7E7E7',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    menuItem: {
      alignItems: 'center',
      gap: 4
    },
    menuText: {
      fontSize: 12,
      color: 'black',
    },
});