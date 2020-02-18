import React from 'react';
import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
