import React from 'react';
import { useHistory } from "react-router-dom";
import {Typography, Avatar, Card, CardActionArea, CardMedia, CardContent, 
    Button, CardActions, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const avatar = "https://cdn.discordapp.com/avatars/797767418285260802/2a60ee2e833a58b3951359c5785c622c.png"
const lookup = "https://i.imgur.com/G4UnLxw.png"
const wargif = "https://i.imgur.com/e9XqE3R.gif"
const gearImg = "https://i.imgur.com/cFF4PTf.png"

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF'
    }, 
    avatar: {
        height: '150px',
        width: '150px'
    }, 
    cards: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF' 
    },
    card: {
        color: '#ffffff',
        backgroundColor: '#2c2f33',
    }
});


function Home() {
    const classes = useStyles();
    const history = useHistory();

    return (
    <div className={classes.root}>
        <div className={classes.title}>
            <Avatar alt="Toshi" src={avatar} className={classes.avatar} />
            <Typography variant="h1">
                Wacky Toshi
            </Typography>
            <br></br>
            
        </div>
        <div className={classes.title}>
            <Typography variant="h4">
                A shitty bot for a shitty game.
            </Typography>
        </div>
        <div className={classes.cards}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="280"
                            src={lookup}
                            title="Lookup Example"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lookup guild history
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Lookup the guild history of players quickly and convieniently.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {history.push("/lookup")}}>
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="280"
                            src={wargif}
                            title="war Example"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Manage war signups
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Manage node war signups effortlessly, remind members to sign up, get attendance data and more.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {history.push("/war")}}>
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="280"
                            src={gearImg}
                            title="Gear Example"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Track gear progression
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Track your gear progression as well as that of your guild!
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {history.push("/gear")}}>
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    </div>
    );
}
 
export default Home;