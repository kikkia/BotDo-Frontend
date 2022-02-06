import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Paper, Box, TextField, MenuItem, Select, FormControl } from '@material-ui/core'

const dateFormattingOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
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
    paddinzgRight: '20px',
  }
}));

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
        history.push('/login')
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
      return (<div>Error: {error.message}</div>);
  } else if (!hasSearched) {
    return (<div>
        <h1>Family Lookup</h1>
        <Grid container spacing={0}>
            <Grid item xs={12} spacing={3}>
                <Paper className={classes.paper}>
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '50%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                    "test"
                </Paper>
            </Grid>
        </Grid>
    </div>)
  } else if (!isLoaded) {
    return (<div>
      <h1>Family Lookup</h1>
      <Grid container spacing={0}>
          <Grid item xs={12} spacing={3}>
              <Paper className={classes.paper}>
              <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '50%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
  </div>)
  } else {
    let memberships = [];
    // Do some quick data processing guild history
    if (fetchedUser.memberships != null) {
      fetchedUser.memberships.forEach(membership => {
        memberships.push({displayName: membership.guild.name, joined: membership.created, active: membership.active, id: membership.id})
      })
    }
    return (<div>
      <h1>Family Lookup</h1>
      <Grid container spacing={0}>
          <Grid item xs={12} spacing={3}>
              <Paper className={classes.paper}>
              <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '50%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="filled-basic" label="Family Name" variant="filled" onKeyDown={handleSearch} />
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
              <Paper className={classes.paperPop}>
                <DataGrid rows={memberships} columns={historyTableColumns} pageSize={5}/>
              </Paper>
          </Grid>
      </Grid>
  </div>)
  }
}
export default Lookup;