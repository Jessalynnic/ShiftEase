import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { supabase } from '../database/supabase';
import { Platform } from 'react-native';

export default function DebugScreen() {

  useEffect(() => {
    console.log('📱 Platform:', Platform.OS);

    (async () => {
      try {
        const { data, error } = await supabase.from('business').select('*').limit(1);
        console.log('Supabase test query:', data, error);
      } catch (err) {
        console.log('Supabase test crash:', err);
      }
    })();
  }, []);

  return (
    <View>
      <Button
        title="Force Logout Test"
        onPress={async () => {
          console.log('Direct logout test');
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.log('Logout failed:', error.message);
            } else {
              console.log('Logout success');
            }
          } catch (err) {
            console.log('Crash in signOut:', err);
          }
        }}
      />

      <Button
        title="Check Session"
        onPress={async () => {
          try {
            const { data, error } = await supabase.auth.getSession();
            console.log('🧪 Current session:', data?.session, error);
          } catch (err) {
            console.log('🔥 getSession crashed:', err);
          }
        }}
      />

      <Button
            title="Force Clear Storage"
            onPress={async () => {
                localStorage.clear();
                indexedDB.deleteDatabase('supabase-auth-token');
                console.log('🧹 Cleared localStorage and indexedDB manually.');
                window.location.reload(); 
            }}
        />
    </View>
  );
}