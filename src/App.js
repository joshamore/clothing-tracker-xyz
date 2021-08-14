import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Add from './pages/Add';
import View from './pages/View';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <Route path='/add' exact component={Add} />
        <Route path='/view' exact component={View} />
      </Switch>
    </Router>
  );
};

export default App;
