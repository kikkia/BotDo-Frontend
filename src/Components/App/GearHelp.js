import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

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
  disclaimer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#111',
    padding: '10%',
    display: 'flex',
    flexdirection: 'column',
  },
  markdown: {
    display: 'block',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF'
  }
})

function GearHelp() {   
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [md, setMd] = useState("");
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://raw.githubusercontent.com/kikkia/BotDO/master/docs/gear.md")
          .then(res => res.text())
          .then(
              (result) => {
                  setMd(result)
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
      return (
        <div className={classes.root}>
          <div className={classes.title}>
              <Typography variant="h1">
                  Gear Tracking
              </Typography>
              <br></br>
              
          </div>
          <div className={classes.title}>
              <Typography variant="h4">
                  Track your gear progression with Toshi
              </Typography>
          </div>
          <div className={classes.container}>
            <div className={classes.markdown}>
              <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
            </div>
          </div>
        </div>
     );
  }
}
export default GearHelp;