import { useState, useEffect } from 'react';
import { supabase } from './helpers/supabaseClient';
import Login from './pages/Login';

const App = () => {
  const [session, setSession] = useState(null);

  console.log(session);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <Login />
      ) : (
        <>
          <p>Nice</p>

          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
};

export default App;
