import React, { Fragment } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Hotel from './Components/Hotel';
import Admin from './Components/Admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render = () => {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/hotel' component={Hotel}></Route>
            <Route exact path='/admin' component={Admin}></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  };
}

export default App;
