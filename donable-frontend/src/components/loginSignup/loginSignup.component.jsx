import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../errors/errorPage.component';
import Login from '../login/login.component';
import Signup from '../signup/signup.component';
import AllCharities from '../charity/allCharities.component';
import SingleCharity from '../charity/singleCharity.component';
import About from '../about/about.component';
import Contact from '../contact/contact.component';
import Career from '../career/career.component';

const LoginSignup = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <AllCharities />
      </Route>
      <Route path='/charity/:charity' component={SingleCharity} />
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/career" component={Career} />
      <Route path='*'>
        <ErrorPage message='404 Page not found' />
      </Route>
    </Switch>
  );
};

export default LoginSignup;
