import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


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

function WarHelp() {   
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [md, setMd] = useState("");
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://raw.githubusercontent.com/kikkia/BotDO/master/docs/wars.md")
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
                  War Managment
              </Typography>
              <br></br>
              
          </div>
          <div className={classes.title}>
              <Typography variant="h4">
                  Manage your wars with Toshi.
              </Typography>
          </div>
          <div className={classes.disclaimer}>
            <Alert severity="warning">War tracking is mainly done through the bot, but there is some barebones stats in website currently.</Alert>
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
export default WarHelp;