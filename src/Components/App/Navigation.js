import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/error">Error</NavLink>
       </div>
    );
}
 
export default Navigation;