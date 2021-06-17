import React from 'react';
import discordLogo from './../../Discord-Logo-White.svg';
import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Paper } from '@material-ui/core';
function Login() {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Wacky Toshi web dashboard
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Avatar src={discordLogo} variant="rounded"/>} 
          href="https://discord.com/oauth2/authorize?client_id=797767418285260802&redirect_uri=http://api.toshi.kikkia.dev/auth/callback&response_type=code&scope=identify">
          Signin with Discord
        </Button>
      </Paper>
    </Container>
  );
}
export default Login;