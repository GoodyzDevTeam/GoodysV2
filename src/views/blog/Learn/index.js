import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import Topics from './Topics';
import QuickTips from './QuickTips';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function LearnView() {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <div>
      <Page title="Dashboard App | Minimal-UI" className={classes.root}>
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
