import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';
import Guilds from "./Guilds";
import Error from './Error';
import Login from './Login';
import Auth from './Auth';
import GearHelp from './GearHelp';
import WarHelp from './WarHelp';
import Lookup from './Lookup';
import Navigation from './Navigation';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation title = "Wacky Toshi"/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/gear" component={GearHelp}/>
          <Route path="/war" component={WarHelp}/>
          <AuthenticatedRoute path="/lookup" component={Lookup}/>
          <Route path="/login" component={Login}/>
          <Route path="/auth" component={Auth}/>
          <AuthenticatedRoute 
            path="/dashboard" 
            component={Dashboard}
          />
          <AuthenticatedRoute
            path="/guilds"
            component={Guilds}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;