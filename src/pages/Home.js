import { useSession } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import CoreLayout from '../components/CoreLayout';
import Spinner from '@material-ui/core/CircularProgress';

const App = () => {
  const session = useSession();

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;

  return (
    <CoreLayout isLoggedIn={!!session.data}>
      <h1>Clothing Tracker</h1>
      {!session.data ? (
        <>
          <div>
            <Link to='login'>Log In</Link>
            <br />
            <Link to='signup'>Signup</Link>
          </div>
        </>
      ) : (
        <div>
          Go to <Link to='/add'>Add</Link> page.
        </div>
      )}
    </CoreLayout>
  );
};

export default App;
