import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import LearnCannabis101 from './LearnCannabis101';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(30)
  },
  dashboard: {
    marginTop: theme.spacing(0)
  }
}));

function learnTopicsView() {
  // const classes = useStyles();

  return (
    <div>
      <Page title="Learn | Goody'z">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <LearnCannabis101 />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}

export default learnTopicsView;
