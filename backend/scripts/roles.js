import { supabase } from "../../database/supabase";

export async function getBusinessRoles(businessId, isManager = null) {
  try {
    let query = supabase
      .from('roles')
      .select('role_id, role_name, is_manager')
      .or(`business_id.eq.${businessId},business_id.is.null`);

    if (isManager !== null) {
      query = query.eq('is_manager', isManager);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching roles:', error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching roles:', err);
    throw err;
  }
}