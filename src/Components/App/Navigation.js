import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from 'react-router-dom';
 
const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }));


const Navigation = (props) => {
    const classes = useStyles();
    const title = props.title
    const auth = props.auth

    const userButton = auth === "true" ?
        <Button
        variant="contained"
        color="secondary"
        startIcon={<Avatar src={'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png'} />}>
            User
        </Button> :
        <Button color="inherit" href="https://discord.com/api/oauth2/authorize?client_id=797767418285260802&redirect_uri=https%3A%2F%2Ftoshi-api.kikkia.dev%2Fauth%2Fcallback&response_type=code&scope=identify">
            Login with Discord
        </Button>

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {userButton}
            </Toolbar>
        </AppBar>
    //    <div>
    //       <NavLink to="/dashboard">Dashboard</NavLink>
    //       <NavLink to="/login">Login</NavLink>
    //       <NavLink to="/error">Error</NavLink>
    //    </div>
    );
}
 
export default Navigation;