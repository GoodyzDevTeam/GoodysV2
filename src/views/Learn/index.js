import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import Topics from './Topics';
import QuickTips from './QuickTips';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(30)
  },
  dashboard: {
    marginTop: theme.spacing(0)
  }
}));

function LearnView() {
  const classes = useStyles();
  const { user } = useAuth();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  return (
    // THIS IS MOST LIKELY A TEMPERARY SOLUTION
    // IM USING THE LOCATION STATE HOOK TO GRAB THE PATHNAME OF THE CURRENT COMPONENT
    // IF IT MATCHES THEN IT WILL RENDER THE DASHBOARD CLASSNAME
    <div
      className={
        location.pathname == '/app/management/blog/learn'
          ? classes.dashboard
          : classes.container
      }
    >
      {/* USING MATERIAL UI GRID  */}
      <Page title="Learn | Goody'z" className={classes.root}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Topics />
            </Grid>
            <Grid item xs={12} md={12}>
              <QuickTips />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}

export default LearnView;
