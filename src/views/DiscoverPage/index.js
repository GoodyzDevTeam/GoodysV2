import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import DiscoverPromo from './DiscoverPromo';
import DiscoverProducts from './DiscoverProducts';
import DiscoverDeliveryService from './DiscoverDeliveryService';
import DiscoverDispensaries from './DiscoverDispensaries';
import DiscoverDeals from './DiscoverDeals';
import DiscoverBrands from './DiscoverBrands';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(20)
  },
  dashboard: {
    marginTop: theme.spacing(0)
  }
}));

function DiscoverAppView() {
  const classes = useStyles();
  const { user } = useAuth();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  return (
    <div
      // THIS IS MOST LIKELY A TEMPERARY SOLUTION
      // IM USING THE LOCATION STATE HOOK TO GRAB THE PATHNAME OF THE CURRENT COMPONENT
      // IF IT MATCHES THEN IT WILL RENDER THE DASHBOARD CLASSNAME
      className={
        location.pathname == '/app/general/discover'
          ? classes.dashboard
          : classes.container
      }
    >
      {/* USING MATERIAL UI GRID  */}
      <Page title="Discover | Goody'z" className={classes.root}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <DiscoverPromo />
            </Grid>
            <Grid item xs={12} md={12}>
              <DiscoverProducts />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DiscoverDeals />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DiscoverDeliveryService />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DiscoverBrands />
            </Grid>
            <Grid item xs={12} md={12}>
              <DiscoverDispensaries />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {/* <CurrentDownload /> */}
            </Grid>
          </Grid>
        </Container>
      </Page>
    </div>
  );
}

export default DiscoverAppView;
