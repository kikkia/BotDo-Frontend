import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Grid, Paper, Box, TextField, MenuItem, Select, FormControl } from '@material-ui/core'
import { styled, createMuiTheme } from '@material-ui/core/styles'
import theme from '../../theme';
import Cookies from 'js-cookie'


const dateFormattingOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperPop: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
  },
  chart: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    width: "99%",
    paddinzgRight: '20px',
  },
  currentGuild: {
    color: "#FFF",
    textAlign: "center"
  }
}));

const StyledGridOverlay = styled(GridOverlay)(({ theme }) => ({
  flexDirection: 'column',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No history found, please make sure the name and region are right.</Box>
    </StyledGridOverlay>
  );
}


const historyTableColumns = [
  { field: 'displayName', 
    headerName: 'Name', 
    flex: 1, 
    minWidth: 200
  },
  { field: 'joined', 
    headerName: 'Joined', 
    flex: 1, 
    minWidth: 200, 
    type: "date", 
    valueFormatter: (params) => {
      const valueFormatted = new Date(params.value).toLocaleDateString("en-US", dateFormattingOptions);
      return `${valueFormatted}`;
    },
  },
  { field: 'active', 
    headerName: 'Current Guild', 
    flex: 1, 
    minWidth: 200
  }
]

function Lookup() {
  const classes = useStyles();
  const history = useHistory();

  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState("");
  const [region, setRegion] = useState("NA");
  const [fetchedUser, setFetched] = useState({});

  useEffect(() => {
    if (!hasSearched) {
      return
    }
    setIsLoaded(false)
    fetch("/api/lookup/user?familyName=" + user + "&region=" + region,
    {
        credentials: 'include',
        mode: "cors"
    })
    .then(res => {
      if (res.status === 401) {
        localStorage.setItem("authed", false);
        Cookies.remove("token")
        history.push('/login')
      } if (res.status === 429) {
        throw new Error('You are searching too fast, users can only search 50 times per day on the website. You can search more on the discord bot too.')
      }
      return res.json()
    })
    .then(
        (result) => {
          setFetched(result)
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
    )}, [user, region])

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.keyCode == 13) {
      setHasSearched(true)
      setUser(event.target.value)
    }
  }

  if (error) {
      return (<div className={classes.currentGuild}>Error: {error.message}</div>);
  } else if (!hasSearched) {
    return (
    <ThemeProvider theme={theme}>
    <div>
        <h1 className={classes.currentGuild}>Family Lookup</h1>
        <Grid container spacing={0}>
            <Grid item xs={12} spacing={3}>
                <Paper className={classes.paper}>
                <Box
                    component="form"
                    
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                    <FormControl variant="filled">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={region}
                        label="Region"
                        color="secondary"
                        onChange={handleRegionChange}
                      >
                        <MenuItem value={"NA"}>NA</MenuItem>
                        <MenuItem value={"EU"}>EU</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} spacing={3}>
                <Paper className={classes.paper}>
                    "Enter a family name to look up their guild history."
                </Paper>
            </Grid>
        </Grid>
    </div></ThemeProvider>)
  } else if (!isLoaded) {
    return (
      <ThemeProvider theme={theme}>
    <div>
      <h1 className={classes.currentGuild}>Family Lookup</h1>
      <Grid container spacing={0}>
          <Grid item xs={12} spacing={3}>
              <Paper className={classes.paper}>
              <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                  <FormControl variant="filled">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={region}
                      label="Region"
                      onChange={handleRegionChange}
                    >
                      <MenuItem value={"NA"}>NA</MenuItem>
                      <MenuItem value={"EU"}>EU</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
          </Grid>
          <Grid item xs={12} spacing={3}>
              <Paper className={classes.paper}>
                  "Fetching user..."
              </Paper>
          </Grid>
      </Grid>
  </div></ThemeProvider>)
  } else {
    let memberships = [];
    let currentGuild = "None"
    // Do some quick data processing guild history
    if (fetchedUser.memberships != null) {
      fetchedUser.memberships.forEach(membership => {
        memberships.push({displayName: membership.guild.name, joined: membership.created, active: membership.active, id: membership.id})
        if (membership.active === true) {
          currentGuild = membership.guild.name
        }
      })
    }
    let sortedMem = memberships.sort((a, b) => b.joined - a.joined);
    return (
      <ThemeProvider theme={theme}>
        <div>
      <h1 className={classes.currentGuild}>Family Lookup</h1>
      <Grid container spacing={0}>
          <Grid item xs={12} spacing={3}>
              <Paper className={classes.paper}>
              <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                  <FormControl variant="filled">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={region}
                      label="Region"
                      onChange={handleRegionChange}
                    >
                      <MenuItem value={"NA"}>NA</MenuItem>
                      <MenuItem value={"EU"}>EU</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
          </Grid>
          <Grid item xs={12} spacing={3}>
              <h2 className={classes.currentGuild}>Current Guild: {currentGuild}</h2>
              <Paper className={classes.paperPop}>
                <DataGrid rows={memberships} className={classes.chart}
                  columns={historyTableColumns} 
                  pageSize={5}
                  components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                  }}/>
                  <p>NA guild history indexed since Apr 6, 2021, EU since Nov 11, 2021.</p>
              </Paper>
          </Grid>
      </Grid>
  </div></ThemeProvider>)
  }
}
export default Lookup;