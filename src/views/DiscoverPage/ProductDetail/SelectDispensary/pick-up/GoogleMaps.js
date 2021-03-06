import ControlStyle from './styles';
import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import React, { Suspense, lazy, useState, useEffect } from 'react';
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
  margin: {
    marginBottom: theme.spacing(3)
  },
  map: {
    zIndex: -2,
    width: 'calc(54vw - 151px)',
    height: '650px',
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
  product: PropTypes.any,
  center: PropTypes.any,
  setCenter: PropTypes.func,
  quantity: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

function GoogleMaps({ dispensaries, product, center, setCenter, quantity, onConfirm, onCancel }) {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  useEffect(() => {
		return () => {
			setLocation();
		}
  }, []);

  return (
    <Page title="Pick Up | Goody'z">
      <Suspense fallback={SkeletonLoad}>
        <ControlStyle />
        <LoadScript {...baseSettings}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <MapAutoComplete
                themes={MAP_THEMES}
                className={classes.map}
                dispensaries={dispensaries}
                product={product}
                center={center}
                setCenter={setCenter}
                onConfirm={onConfirm}
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
