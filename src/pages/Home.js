import { useSession } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import CoreLayout from '../components/CoreLayout';
import Spinner from '@material-ui/core/CircularProgress';

const Home = () => {
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
          <p>
            Go to <Link to='/add'>Add</Link> page.
          </p>
          <p>
            Go to <Link to='/view'>View</Link> page.
          </p>
        </div>
      )}
    </CoreLayout>
  );
};

export default Home;
