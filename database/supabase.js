import { createClient } from "@supabase/supabase-js";
//import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);