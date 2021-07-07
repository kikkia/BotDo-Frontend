import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';
import Guilds from "./Guilds";
import Error from './Error';
import Login from './Login';
import Auth from './Auth';
import Navigation from './Navigation';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';

function App() {
  const authed = sessionStorage.getItem("authed")
  return (
    <BrowserRouter>
      <div>
        <Navigation title = "Wacky Toshi" auth = {authed}/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/auth" component={Auth}/>
          <AuthenticatedRoute 
            path="/dashboard" 
            component={Dashboard} 
            appProps={ {isAuthed: authed} }
          />
          <AuthenticatedRoute
            path="/guilds"
            component={Guilds}
            appProps={{isAuthed: authed}}
          />
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;