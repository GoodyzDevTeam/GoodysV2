import ControlStyle from './styles';
import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import React, { Suspense, lazy, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadScript } from '@react-google-maps/api';
import { HeaderDashboard } from 'src/layouts/Common';
import {
  DarkTheme,
  RetroTheme,
  NightTheme,
  SilverTheme,
  FlatPaleTheme,
  StandardTheme,
  AubergineTheme
} from './themes';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Skeleton,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
import DispensaryPickup from 'src/views/pick-up/DispensaryPickup';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

const MAP_THEMES = {
  standard: StandardTheme,
  dark: DarkTheme,
  night: NightTheme,
  retro: RetroTheme,
  silver: SilverTheme,
  flatpale: FlatPaleTheme,
  aubergine: AubergineTheme
};

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: 'red',
    marginTop: theme.spacing(8)
  },
  dashboard: {
    // backgroundColor: 'blue',
    marginTop: theme.spacing(-5)
  },
  margin: {
    marginBottom: theme.spacing(3)
  },
  map: {
    zIndex: -2,
    width: '100%'
  },
  pickUpOptions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: '10%',
    height: '5vh',
    width: '100%',
    zIndexY: 2,
    overflow: 'scroll',
    position: 'fixed',
    bottom: 0,
    justifyContent: 'center'
  }
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2, mb: 5 }}
    />
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
  </>
);

const baseSettings = {
  id: 'script-loader',
  googleMapsApiKey: 'AIzaSyBHzyhqumh61czRRfaokoN8cU9sOybSJGc',
  loadingElement: SkeletonLoad,
  language: 'en',
  region: 'EN',
  version: 'weekly',
  libraries: ['drawing', 'visualization', 'places']
};

const MapAutoComplete = lazy(() => import('./MapAutoComplete'));

GoogleMaps.propTypes = {
  dispensaries: PropTypes.array,
  center: PropTypes.any,
  setCenter: PropTypes.func,
};

function GoogleMaps({ dispensaries, center, setCenter }) {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  return (
    <Page
      title="Pick Up | Goody'z"
      className={
        location.pathname == '/app/managment/pickup'
          ? classes.dashboard
          : classes.container
      }
    >
      {/* <HeaderDashboard
          // heading="Google Map"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            // { name: 'Map', href: PATH_APP.components.map.root },
            { name: 'Google Map' }
          ]}
          // moreLink="AIzaSyBHzyhqumh61czRRfaokoN8cU9sOybSJGc"
        /> */}

      <Suspense fallback={SkeletonLoad}>
        <ControlStyle />
        <LoadScript {...baseSettings}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <MapAutoComplete
                themes={MAP_THEMES}
                className={classes.map}
                dispensaries={dispensaries}
                center={center}
                setCenter={setCenter}
              />
            </Grid>
          </Grid>
        </LoadScript>
      </Suspense>
      {/* <div className={classes.pickUpOptions}>
        <DispensaryPickup />
      </div> */}
    </Page>
  );
}

export default GoogleMaps;
