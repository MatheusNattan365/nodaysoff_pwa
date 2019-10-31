import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Login from '../src/components/Login'
import Register from '../src/components/Register'


import AppBar from '../src/components/AppBar'
import Footer from '../src/components/Footer'

import User from '../src/components/User'
import CreateEvent from '../src/components/User/CreateGame'

import Games from './components/Games'
import Game from './components/Game'


export default function Routes() {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/eventos/:name" component={Game} />
        <Route path="/eventos" exact component={Games} />

        <Redirect exact from="/" to="/eventos" />

        <Route path="/login" component={Login} />

        <Route path="/register" component={Register} />
        <Route path="/createevent/:iduser" component={CreateEvent} />

        <Route path="/users/:id" exact component={User} />
      </Switch>
      <Footer />
    </Router>
  );
}
