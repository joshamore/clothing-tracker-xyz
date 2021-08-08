import { useState, useEffect } from 'react';
import { supabase } from './helpers/supabaseClient';
import Spinner from '@material-ui/core/CircularProgress';
import Login from './pages/Login';

const App = () => {
  const [session, setSession] = useState({ loading: true, data: null });

  useEffect(() => {
    setSession({ loading: false, data: supabase.auth.session() });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ loading: false, data: session });
    });
  }, []);

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;

  return (
    <div>
      {!session.data ? (
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
