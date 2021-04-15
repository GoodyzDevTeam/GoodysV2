import React from 'react';
import Welcome from './Welcome';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import HomePageHubDeals from './HomePageHubDeals';
import ProductsUMayLike from './ProductsUMayLike';
import DispensariesUMayLike from './DispensariesUMayLike';
import FavoriteProducts from './FavoriteProducts';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Page title="Your Goody'z Hub| Goody'z" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Welcome displayName={user.displayName} />
          </Grid>

          <Grid item xs={12} md={6.3}>
            <HomePageHubDeals />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <FavoriteProducts />
          </Grid>

          <Grid item xs={12} md={12}>
            <ProductsUMayLike />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <DispensariesUMayLike />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAppView;
