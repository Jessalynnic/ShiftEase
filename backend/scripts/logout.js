import { supabase } from "../../database/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  console.log('Logout called...');
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.warn('Logout error:', error.message);
    }

    
    await AsyncStorage.clear();

    console.log('Supabase session and storage cleared');
  } catch (err) {
    console.error('Unexpected logout crash:', err);
  }
};