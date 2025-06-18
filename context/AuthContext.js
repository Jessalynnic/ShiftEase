import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../database/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            // Check if session is stale (e.g., user was deleted)
            if (session) {
                const { data: userData, error: userError } = await supabase.auth.getUser();

                if (!userData?.user || userError) {
                    // Stale session: force logout
                    await supabase.auth.signOut();
                    setSession(null);
                    return;
                }
            }

            setSession(session);
        };

        initAuth();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);