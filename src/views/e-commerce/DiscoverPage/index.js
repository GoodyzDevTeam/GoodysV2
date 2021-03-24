import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function DiscoverAppView() {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <div>
      <Page title="Dashboard App | Minimal-UI" className={classes.root}>
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
