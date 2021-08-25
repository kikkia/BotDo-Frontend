import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Paper } from '@material-ui/core'

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

const userTableColumns = [
    { field: "id", headerName: "ID", width: 100},
    { field: 'displayName', headerName: 'Display Name', width: 175 },
    { field: 'class', headerName: 'Class', width: 130 },
    { field: 'count', headerName: 'Wars Attended', width: 175, type: 'number' }
]

const Content = () => { 
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [upcomingWars, setUpcoming] = useState([]);
    const [pastWars, setPast] = useState([]);
    const [users, setUsers] = useState({});
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/api/" + localStorage.getItem("guild") + "/war/history?daysAgo=7",
        {
            credentials: 'include',
            mode: "cors"
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.setItem("authed", false);
            history.push('/login')
          }
          return res.json()
        })
        .then(
            (result) => {
                setPast(result.wars);
                setIsLoaded(true);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
        
        fetch("/api/" + localStorage.getItem("guild") + "/war/upcoming?",
        {
            credentials: 'include',
            mode: "cors"
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.setItem("authed", false);
            history.push('/login')
          }
          return res.json()
        })
        .then(
            (result) => {
                setUpcoming(result.wars);
                setIsLoaded(true);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )

        fetch("/api/" + localStorage.getItem("guild") + "/war/eligible",
        {
            credentials: 'include',
            mode: "cors"
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.setItem("authed", false);
            history.push('/login')
          }
          return res.json()
        })
        .then(
            (result) => {
                setUsers(result.users);
                setIsLoaded(true);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {
        // Set war attendance stats
        let attendanceMap = {}
        pastWars.forEach(war => {
            war.attendees.forEach(attendee => {
                if (attendanceMap[attendee.userId] == null) {
                    attendanceMap[attendee.userId] = {id: attendee.userId, count: 0, displayName: attendee.userDisplayName}
                }
                if (attendee.attended) 
                        attendanceMap[attendee.userId].count++
            })
        })

        // Fill in eligible that may have never showed
        Object.values(users).forEach(user => {
            if (attendanceMap[user.userId] == null) {
                attendanceMap[user.userId] = {id: user.userId, count: 0, class: user.className, displayName: user.displayName}
            } else {
                attendanceMap[user.userId].class = user.className
            }
        })

        let attendance = (Object.values(attendanceMap))

        return (<div>
            <h1>War</h1>
            <Grid container spacing={0}>
                <Grid item xs={4} spacing={3}>
                    <Paper className={classes.paper}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={attendance} columns={userTableColumns} pageSize={5}/>
                    </div>
                    </Paper>
                </Grid>
                <Grid item xs={8} spacing={3}>
                    <Paper className={classes.paper}>
                        
                    </Paper>
                </Grid>
                <Grid item xs={5} spacing={3}>
                    <Paper className={classes.paper}>
                        
                    </Paper>
                </Grid>
                <Grid item xs={5} spacing={3}>
                    <Paper className={classes.paper}>
                        
                    </Paper>
                </Grid>
            </Grid>
            
        </div>)
    }
}
export default Content;