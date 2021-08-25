import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import RecruitPosts from "./RecruitPost"
import Wars from "./Wars"
import DashboardNav from "./DashboardNav"
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function navTabsProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const [view, setView] = React.useState(0);

    const handleViewChange = (event, newValue) => {
      setView(newValue);
    };

    if (!localStorage.getItem("guild")) {
      history.push('/guilds');
      return(<div></div>)
    }

    let recruiting = view == 0 ? (<RecruitPosts></RecruitPosts>) 
    : (<div></div>)
    let settings = view == 2 ? (<div></div>) : (<div></div>)
    let war = view == 1 ? (<Wars></Wars>) : (<div></div>)

    return (
       <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={view} onChange={handleViewChange} aria-label="simple tabs example">
              <Tab label="Recrtuitment" {...navTabsProps(0)} />
              <Tab label="War" {...navTabsProps(1)} />
              <Tab label="Guild Settings" {...navTabsProps(2)} />
            </Tabs>
          </AppBar>
          {recruiting}
          {war}
          {settings}
       </div>
    );
}
 
export default Dashboard;