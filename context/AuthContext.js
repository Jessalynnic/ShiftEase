import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../database/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data: businessData, error } = await supabase
          .from("business")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (!error) {
          setBusiness(businessData);
        }
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session?.user) {
        const { data: businessData, error } = await supabase
          .from("business")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (!error) {
          setBusiness(businessData);
        } else {
          setBusiness(null);
        }
      } else {
        setBusiness(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, business }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);