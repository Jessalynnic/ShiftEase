import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../database/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      console.log("🔐 Starting auth init...");

      try {
        // Force session rehydrate
        const sessionData = await supabase.auth.getSession();
        
        setSession(sessionData.data.session);

        if (sessionData.data.session?.user) {
          const { data: businessData, error: businessError } = await supabase
            .from("business")
            .select("*")
            .eq("user_id", sessionData.data.session.user.id)
            .single();

          if (!businessError) {
            setBusiness(businessData);
          } else {
            console.warn("Business load error:", businessError.message);
            setBusiness(null);
          }
        }
      } catch (err) {
        console.error("Error in initAuth:", err);
      }

      setLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      
      setSession(session);

      if (session?.user) {
        supabase
          .from("business")
          .select("*")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.warn("Auth change: business fetch failed:", error.message);
              setBusiness(null);
            } else {
              setBusiness(data);
            }
          });
      } else {
        setBusiness(null);
      }

      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, business, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);