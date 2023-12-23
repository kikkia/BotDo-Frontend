import {Redirect, Route} from 'react-router-dom';
import Cookies from 'js-cookie'

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={
            props => 
                Cookies.get("userId") !== undefined 
                ? <C {...props} {...appProps}/>
                : <Redirect to={`/auth`}/>}
      />
    );
  }