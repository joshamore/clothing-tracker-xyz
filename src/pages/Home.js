import { useSession } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import Spinner from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';

const App = () => {
  const session = useSession();

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;

  return (
    <div>
      <Navbar isLoggedIn={!!session.data} />
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
    </div>
  );
};

export default App;
