import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import moment from 'moment';

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

// parses response data into posts by individuals
function parseRecruitPostInfo(results) {
    let parsedResults = {postsByUser: {}, postsByChannel: {}, timeSinceLastPost: {}}
    // Pasrse posts by user
    results['posts'].map(post => {
        if (parsedResults.postsByUser[post.author.discordUsername] == null) {
            parsedResults.postsByUser[post.author.discordUsername] = 1;
        } else {
            parsedResults.postsByUser[post.author.discordUsername]++;
        }

        if (parsedResults.postsByChannel[post.channel] == null) {
            parsedResults.postsByChannel[post.channel] = 1;
            parsedResults.timeSinceLastPost[post.channel] = post.created
        } else {
            parsedResults.postsByChannel[post.channel]++;
            if (parsedResults.timeSinceLastPost[post.channel] < post.created) {
                parsedResults.timeSinceLastPost[post.channel] = post.created
            }
        }
    });

    // Remap response for charting
    let response = {postsByUser: [], postsByChannel: [], timeSinceLastPost: []}
    Object.entries(parsedResults.postsByUser).forEach(([key, value]) => {
        response['postsByUser'].push({User: key, Posts: value})
    });
    Object.entries(parsedResults.postsByChannel).forEach(([key, value]) => {
        response['postsByChannel'].push({Channel: key, Posts: value})
    });
    Object.entries(parsedResults.timeSinceLastPost).forEach(([key, value]) => {
        response['timeSinceLastPost'].push({channel: key, val: {last: moment(value), total: parsedResults['postsByChannel'][key]}})
    });

    return response
}

const RecruitPosts = ({timeframe}) => {
    const classes = useStyles();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postsByUser, setUserPosts] = useState({});
    const [postsByChannel, setChannelPosts] = useState({});
    const [timeSinceLastPost, setTimeSinceLast] = useState({});

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/api/" + localStorage.getItem("guild") + "/recruitment/posts?daysAgo=" + timeframe,
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let data = parseRecruitPostInfo(result);
                    setUserPosts(data.postsByUser)
                    setChannelPosts(data.postsByChannel)
                    setTimeSinceLast(data.timeSinceLastPost)
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
        return (
            <div>
               <h1>Recruitment Post Stats</h1>

                <Grid container spacing={0}>
                    <Grid item xs={3} spacing={3}>
                        <Paper className={classes.paper}>
                        <Chart data={postsByChannel}>
                            <ArgumentAxis />
                            <ValueAxis max={100} />

                            <BarSeries
                                valueField="Posts"
                                argumentField="Channel"/>
                            <Title text="Posts by Channel" />
                            <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={5} spacing={3}>
                    <Paper className={classes.paper}>
                        <Chart data={postsByUser}>
                            <ArgumentAxis />
                            <ValueAxis max={100} />

                            <BarSeries
                                valueField="Posts"
                                argumentField="User"/>
                            <Title text="Posts by User" />
                            <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} spacing={3}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Channel</TableCell>
                                    <TableCell align="right">Total Posts</TableCell>
                                    <TableCell align="right">Last Posted</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {timeSinceLastPost.map((row) => (
                                    <TableRow key={row.channel}>
                                    <TableCell component="th" scope="row">
                                        {row.channel}
                                    </TableCell>
                                    <TableCell align="right">{row.val.total}</TableCell>
                                    <TableCell align="right">{row.val.last.fromNow()}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
 
export default RecruitPosts;