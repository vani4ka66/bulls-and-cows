import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import Home from './Home/home';
import Bulls from './bulls';
import Register from './register';
import Login from './login';


function App() {
  return (
    <Router>
      <Switch>
        <Fragment>
        <div className="App">
          <div className="App-header">

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/bulls">
              <Bulls />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            
          </div>
        </div>
        </Fragment>
 
      </Switch>
    </Router>
   );
}

export default App;