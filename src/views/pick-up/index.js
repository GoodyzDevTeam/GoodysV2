import { makeStyles } from '@material-ui/core/styles';
import { GoogleApiWrapper } from 'google-maps-react';
import React, { useState } from 'react';
import GoogleMaps from '../uikit/extra-components/MapView/GoogleMaps';
import DispensaryPickup from './DispensaryPickup';
import Map1 from './map';
import { Container, Grid } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(10),
    // maxWidth: '100%',
    marginLeft: theme.spacing(0)
  },
  dashboard: {
    marginTop: theme.spacing(-30),
    // maxWidth: '100%',
    marginTop: theme.spacing(0)
  },
  map: {
    // position: 'sticky'
  },
  disp: {
    marginLeft: '10%',
    marginRight: '10%',
    maxHeight: theme.spacing(50),
    overflow: 'scroll'
  }
}));

function Index() {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER

  return (
    <div
      className={
        location.pathname == '/app/managment/pickup'
          ? classes.dashboard
          : classes.container
      }
    >
      <GoogleMaps />;
    </div>
  );
}

export default Index;
