import ControlStyle from './styles';
import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import React, { Suspense, lazy, useState } from 'react';
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
    backgroundColor: 'red',
    marginTop: theme.spacing(8)
    // width: '100%'
  },
  dashboard: {
    backgroundColor: 'blue',
    marginTop: theme.spacing(-5)
    // width: '100%'
  },
  margin: {
    marginBottom: theme.spacing(3)
  },
  map: {
    zIndex: -2,
    // height: 560,
    width: '100%'
    // overflow: 'hidden'
    // position: 'relative'
    // borderRadius: theme.shape.borderRadius
  },
  options: {
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
    // alignItems: 'center'
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

// const GoogleMapCircle = lazy(() => import('./GoogleMapCircle'));
// const GoogleMapMarker = lazy(() => import('./GoogleMapMarker'));
// const GoogleMapPolygon = lazy(() => import('./GoogleMapPolygon'));
// const GoogleMapPolyline = lazy(() => import('./GoogleMapPolyline'));
// const GoogleMapRectangle = lazy(() => import('./GoogleMapRectangle'));
// const GoogleMapStreetView = lazy(() => import('./GoogleMapStreetView'));
// const GoogleMapChangeTheme = lazy(() => import('./GoogleMapChangeTheme'));
const GoogleMapAutocomplete = lazy(() => import('./GoogleMapAutocomplete'));
// const GoogleMapHeatmapLayer = lazy(() => import('./GoogleMapHeatmapLayer'));
// const GoogleMapTrafficLayer = lazy(() => import('./GoogleMapTrafficLayer'));
// const GoogleMapTransitLayer = lazy(() => import('./GoogleMapTransitLayer'));
// const GoogleMapGroundOverlay = lazy(() => import('./GoogleMapGroundOverlay'));
// const GoogleMapDrawingManager = lazy(() => import('./GoogleMapDrawingManager'));
// const GoogleMapBicyclingLayer = lazy(() => import('./GoogleMapBicyclingLayer'));
const GoogleMapStreetViewPanorama = lazy(() =>
  import('./GoogleMapStreetViewPanorama')
);

function GoogleMaps() {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  return (
    <Page
      title="Goody's| Pick Up"
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
              {/* <Card className={classes.margin}>
                <CardHeader title="Google Map Autocomplete" />
                <CardContent dir="ltr"> */}
              <GoogleMapAutocomplete
                themes={MAP_THEMES}
                className={classes.map}
              />
              {/* </CardContent>
              </Card> */}
            </Grid>
          </Grid>
        </LoadScript>
      </Suspense>
      <div className={classes.options}>
        <DispensaryPickup />
      </div>
    </Page>
  );
}

export default GoogleMaps;
