import { supabase } from '../helpers/supabaseClient';
import { useSession } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import Spinner from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';

const DummyLoggedInHome = () => {
  return (
    <>
      <p>Nice - you're logged in.</p>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </>
  );
};

const App = () => {
  const session = useSession();

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;

  return (
    <div>
      {!session.data ? (
        <>
          <Navbar />
          <h1>Clothing Tracker</h1>
          <div>
            <Link to='login'>Log In</Link>
            <br />
            <Link to='signup'>Signup</Link>
          </div>
        </>
      ) : (
        <DummyLoggedInHome />
      )}
    </div>
  );
};

export default App;
