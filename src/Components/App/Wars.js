import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Paper } from '@material-ui/core'
import { Chart, ArgumentAxis, ValueAxis,
    AreaSeries,
    Title,
    Legend,
  } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { curveCatmullRom, area, } from 'd3-shape';
import { scalePoint } from 'd3-scale';
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    chart: {
        paddinzgRight: '20px',
    },
}));

const Area = props => (
    <AreaSeries.Path
      {...props}
      path={area()
        .x(({ arg }) => arg)
        .y1(({ val }) => val)
        .y0(({ startVal }) => startVal)
        .curve(curveCatmullRom)}
    />
  );

const userTableColumns = [
    { field: "id", headerName: "ID", width: 100},
    { field: 'displayName', headerName: 'Display Name', width: 175 },
    { field: 'class', headerName: 'Class', width: 130 },
    { field: 'count', headerName: 'Wars Attended', width: 175, type: 'number' }
]

const Content = ({timeframe}) => { 
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [upcomingWars, setUpcoming] = useState([]);
    const [pastWars, setPast] = useState([]);
    const [users, setUsers] = useState({});
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/api/" + localStorage.getItem("guild") + "/war/history?daysAgo=" + timeframe,
        {
            credentials: 'include',
            mode: "cors"
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.setItem("authed", false);
            Cookies.remove("token")
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
        
        fetch("/api/" + localStorage.getItem("guild") + "/war/upcoming",
        {
            credentials: 'include',
            mode: "cors"
        })
        .then(res => {
          if (res.status === 401) {
            localStorage.setItem("authed", false);
            Cookies.remove("token")
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
            Cookies.remove("token")
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
    }, [timeframe])

    if (error) {
        return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {
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

        if (users != null) {
            // Fill in eligible that may have never showed
            Object.values(users).forEach(user => {
                if (attendanceMap[user.userId] == null) {
                    attendanceMap[user.userId] = {id: user.userId, count: 0, class: user.className, displayName: user.displayName}
                } else {
                    attendanceMap[user.userId].class = user.className
                }
            })
        }

        // Set past war attendance graph
        let pastWarAttendance = []
        let dateFormattingOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        pastWars.forEach(war => {
            let attended = 0
            war.attendees.forEach(attendee => {
                if (attendee.attended)
                    attended++
            })
            let warDate = new Date(war.warTime)
            pastWarAttendance.push({date: warDate.toLocaleDateString("en-US", dateFormattingOptions), 
                attendees: attended})
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
                        <Chart data={pastWarAttendance} className={classes.chart}>
                            <ArgumentScale factory={scalePoint} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <AreaSeries
                                name="Attendance"
                                valueField="attendees"
                                argumentField="date"
                                seriesComponent={Area}
                            />
                            <Title text="Past war attendance" />
                        </Chart>
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