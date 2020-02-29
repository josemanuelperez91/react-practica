import React from 'react';
import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Update from './components/edit/Update';
import Create from './components/edit/Create';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/detail/:ID" component={Detail} />
          <Route path="/update/:ID" component={Update} />
          <Route path="/create" component={Create} />

          <Route>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
