import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Link, IconButton, Button, Avatar, List, Drawer, 
    ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie'
import avatarUtils from '../../utils/avatars';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import QuestionIcon from '@material-ui/icons/QuestionAnswerRounded';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

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
    const history = useHistory();
    const classes = useStyles();
    const title = props.title;
    const auth = sessionStorage.getItem("authed");
    const [state, setState] = React.useState({
        state: false
    });

    const logout = (event) => {
        sessionStorage.setItem("authed", false)
        fetch("/api/auth/logout")
        history.push("/")
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, state: open });
      };

    let avatarUrl = auth === "true" && Cookies.get("avatar") != "None" ? avatarUtils.getAvatarUrl(Cookies.get("userId"), Cookies.get("avatar")) 
        : "";
    const userButton = auth === "true" ?
        <Button variant="contained" color="secondary" startIcon={<Avatar src={avatarUrl}/>}>
            {Cookies.get("username")}
        </Button> :
        <Button color="inherit" href={process.env.REACT_APP_LOGIN_URL}>
            Login with Discord
        </Button>

    // Defines nav drawer pages
    const list = () => (
        <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        <List>
            <ListItem button key="home" onClick={ () => history.push("/") }>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="lookup" onClick={ () => history.push("/lookup") }>
                <ListItemIcon><SearchIcon/></ListItemIcon>
                <ListItemText primary="Family Lookup" />
            </ListItem>
            <ListItem button key="dashboard" onClick={ () => history.push("/dashboard") }>
                <ListItemIcon><DashboardIcon/></ListItemIcon>
                <ListItemText primary="Guild Dashboard" />
            </ListItem>
            <ListItem button key="war" onClick={ () => history.push("/war") }>
                <ListItemIcon><QuestionIcon/></ListItemIcon>
                <ListItemText primary="War Tracking" />
            </ListItem>
            <ListItem button key="gear" onClick={ () => history.push("/gear") }>
                <ListItemIcon><QuestionIcon/></ListItemIcon>
                <ListItemText primary="Gear Tracking" />
            </ListItem>
            <ListItem button key="guilds" onClick={ () => history.push("/guilds") }>
                <ListItemIcon><SwapHorizIcon/></ListItemIcon>
                <ListItemText primary="Change Guilds" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key="Logout" onClick={logout}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" 
                    className={classes.menuButton} onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={state["state"]} onClose={toggleDrawer(false)}>
                    {list("left")}
                </Drawer>
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