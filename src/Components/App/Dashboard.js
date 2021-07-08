import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

const Dashboard = () => {
    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    return (
       <div>
          <h1>Dashboard</h1>
           <p>Home page body content</p>
       </div>
    );
}
 
export default Dashboard;