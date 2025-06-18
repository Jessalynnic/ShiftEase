import { supabase } from "../../database/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginBusiness(email, password) {
    try {
        // Sign in business with email + password
        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            return {
                success: false,
                message: loginError.message
            };
        }

        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (!userId) {
            return {
                success: false,
                message: 'Failed to retrieve user after login'
            };
        }

        // Check if business record exists
        const { data: existingBusiness, error: businessError } = await supabase
            .from('business')
            .select('business_id')
            .eq('user_id', userId)
            .maybeSingle();

        if (businessError) {
            return {
                success: false,
                message: businessError.message
            };
        }

        // Insert business record if missing
        if (!existingBusiness) {
            const storedName = await AsyncStorage.getItem('pendingBusinessName');

            const { error: insertError } = await supabase
                .from('business')
                .insert({
                    user_id: userId,
                    business_email: email,
                    business_name: storedName || 'Pending Setup', 
                });

            await AsyncStorage.removeItem('pendingBusinessName');

            if (insertError) {
                return { success: false, message: insertError.message };
            }
        }

        return {
            success: true,
            message: 'Login successful',
        };
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'Unexpected error during login' };
    }
}