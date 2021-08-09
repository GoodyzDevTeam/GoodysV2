import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Container, Grid, Card, Box, CardContent, Typography } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import DiscoverPromo from './DiscoverPromo';
import DiscoverProducts from './DiscoverProducts';
import DiscoverDeliveryService from './DiscoverDeliveryService';
import DiscoverDispensaries from './DiscoverDispensaries';
import DiscoverDeals from './DiscoverDeals';
import DiscoverBrands from './DiscoverBrands';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(20)
  },
  dashboard: {
    marginTop: theme.spacing(0)
  },
  img: {
    width: '100%',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      height: theme.spacing(20)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      height: theme.spacing(20)
    },
    //large desktop
    ['@media (min-width: 1524px)']: {
      height: theme.spacing(30)
    }
    // borderRadius: theme.spacing(1)
  }
}));

const Service = ({ link, name, image, className="", bColor }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={3}>
      <RouterLink to={link}>
        <Card className={clsx(classes.root, className)}>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                top: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.12)
              }}
            />
            <Box
              component="img"
              alt=""
              sx={{background: bColor}}
              src={image}
              className={classes.img}
            />
            <CardContent
              sx={{
                bottom: 30,
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                color: 'common.white'
              }}
            >
              <Typography variant="h5" gutterBottom noWrap>
                {name}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </RouterLink>
    </Grid>
  );
};

function DiscoverAppView() {
  const classes = useStyles();
  const { user } = useAuth();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER
  const [viewAll, setViewAll] = useState('');

  useEffect(() => {
    return () => {
      setViewAll('');
    }
  }, []);

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
            {viewAll == '' && <Grid item xs={12} md={12}>
              <DiscoverProducts />
            </Grid>}
            {(viewAll == '' || viewAll == 'dispensaries') && <Grid item xs={12} md={12} lg={12}>
              <DiscoverDispensaries viewAll={viewAll} setViewAll={setViewAll}/>
            </Grid>}
            {(viewAll == '' || viewAll == 'deliveries') && <Grid item xs={12} md={12} lg={12}>
              <DiscoverDeliveryService viewAll={viewAll} setViewAll={setViewAll}/>
            </Grid>}
            {(viewAll == '' || viewAll == 'brands') && <Grid item xs={12} md={12} lg={12}>
              <DiscoverBrands viewAll={viewAll} setViewAll={setViewAll}/>
            </Grid>}
            {(viewAll == '' || viewAll == 'deals') && <Grid item xs={12} md={12}>
              <DiscoverDeals viewAll={viewAll} setViewAll={setViewAll}/>
            </Grid>}
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
