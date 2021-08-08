import { useState, useEffect } from 'react';
import { supabase } from './helpers/supabaseClient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Spinner from '@material-ui/core/CircularProgress';
import Home from './pages/Home';
import Signup from './pages/Signup';
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
    <Router>
      <Switch>
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
    // <div>
    //   {!session.data ? (
    //     <Signup />
    //   ) : (
    //     <>
    //       <p>Nice</p>
    //       <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    //     </>
    //   )}
    // </div>
  );
};

export default App;
