import {Redirect, Route} from 'react-router-dom';

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={
            props => 
                sessionStorage.authed === "true" 
                ? <C {...props} {...appProps}/>
                : <Redirect to={`/auth`}/>}
      />
    );
  }