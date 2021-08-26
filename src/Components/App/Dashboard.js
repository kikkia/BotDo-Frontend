import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
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
  timeframe: {
    left: '90%',
    display: 'inline-block',
    position: 'absolute',
  }
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
    const [timeframe, setTimeframe] = React.useState(7);
    const [open, setOpen] = React.useState(false);


    const handleViewChange = (event, newValue) => {
      setView(newValue);
    };

    const handleTimeframeChange = (event) => {
      setTimeframe(event.target.value);
    };
  
    const handleTfClose = () => {
      setOpen(false);
    };
  
    const handleTfOpen = () => {
      setOpen(true);
    };

    if (!localStorage.getItem("guild")) {
      history.push('/guilds');
      return(<div></div>)
    }

    let recruiting = view == 0 ? (<RecruitPosts timeframe={timeframe}></RecruitPosts>) 
    : (<div></div>)
    let settings = view == 2 ? (<div></div>) : (<div></div>)
    let war = view == 1 ? (<Wars timeframe={timeframe}></Wars>) : (<div></div>)

    return (
       <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={view} onChange={handleViewChange} aria-label="simple tabs example">
              <Tab label="Recrtuitment" {...navTabsProps(0)} />
              <Tab label="War" {...navTabsProps(1)} />
              <Tab label="Guild Settings" {...navTabsProps(2)} />
            </Tabs>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                className = {classes.timeframe}
                open={open}
                onClose={handleTfClose}
                onOpen={handleTfOpen}
                value={timeframe}
                onChange={handleTimeframeChange}
              >
                <MenuItem value={7}>1 Week</MenuItem>
                <MenuItem value={14}>2 Weeks</MenuItem>
                <MenuItem value={30}>1 Month</MenuItem>
                <MenuItem value={60}>2 Months</MenuItem>
                <MenuItem value={365}>1 year</MenuItem>
              </Select>
          </AppBar>
          {recruiting}
          {war}
          {settings}
       </div>
    );
}
 
export default Dashboard;