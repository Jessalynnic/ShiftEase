import { Platform } from 'react-native';
import { supabase } from "../../database/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  console.log('Logout called...');

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.warn('Supabase logout error:', error.message);
    }

    // Mobile: clear AsyncStorage
    if (Platform.OS !== 'web') {
      await AsyncStorage.clear();
      console.log('📱 Cleared AsyncStorage');
    }

    // Web: clear localStorage + indexedDB + reload
    if (Platform.OS === 'web') {
      try {
        localStorage.clear();
        indexedDB.deleteDatabase('supabase-auth-token');
        console.log('Cleared localStorage and indexedDB manually.');
        window.location.reload(); // full hard reset
      } catch (webErr) {
        console.error('Web logout fallback failed:', webErr);
      }
    }

  } catch (err) {
    console.error('Unexpected logout crash:', err);
  }
};
