import { supabase } from "../../database/supabase";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
  } else {
    console.log('User signed out');
  }
};