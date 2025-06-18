import { supabase } from "../../database/supabase";

export async function registerBusiness(businessName, businessEmail, password) {
    try {
        // Check if business name already exists
        const nameCheck = await supabase
            .from('business')
            .select('business_id')
            .eq('business_name', businessName)
            .maybeSingle();
        
        if (nameCheck.data) {
            return {
                success: false,
                message: 'Business name already exists'
            };
        }

        // Check if business email already exists
        const emailCheck = await supabase
            .from('business')
            .select('business_id')
            .eq('business_email', businessEmail)
            .maybeSingle();

        if (emailCheck.data) {
            return {
                success: false,
                message: 'Business name already exists'
            };
        }

        // Register the business with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: businessEmail,
            password,
        });

        if (error) {
            return {
                success: false, 
                message: error.message
            };
        }

        return {
            success: true,
            message: 'Check your email to confirm your registration.',
        };
    } catch (err) {
        console.error('Error during business registration:', err);
        return { success: false, message: 'Unexpected error' };
    }
}

export async function createBusinessRecord(userId, businessName, businessEmail) {
    const { data, error } = await supabase
        .from('business')
        .insert({
            user_id: userId,
            business_name: businessName,
            business_email: businessEmail,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}