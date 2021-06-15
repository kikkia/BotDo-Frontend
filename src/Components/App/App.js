import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';
import Error from './Error';
import Login from './Login';
import Navigation from './Navigation';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;