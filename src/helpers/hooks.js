import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const useSession = () => {
  const [session, setSession] = useState({ loading: true, data: null });

  useEffect(() => {
    setSession({ loading: false, data: supabase.auth.session() });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ loading: false, data: session });
    });
  }, []);

  return session;
};
