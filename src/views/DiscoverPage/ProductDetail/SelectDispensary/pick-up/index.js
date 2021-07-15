import { makeStyles } from '@material-ui/core/styles';
import { GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import GoogleMaps from './GoogleMaps';
import DispensaryPickup from './DispensaryPickup';
import { Container, Grid } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDispensaries } from 'src/redux/slices/dispensary';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    height: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'hidden',
    marginTop: '20px',
  },
}));

const getDistance = (position1, position2) => {
  const R = 6371;
  const dLat = deg2rad(position2.lat-position1.lat);  // deg2rad below
  const dLon = deg2rad(position2.lng-position1.lng); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(position1.lat)) * Math.cos(deg2rad(position2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return (Math.round(d * 1000)) / 1000;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

const compareDistance = (center) => (d1, d2) => {
  if (getDistance(center, d1.location) > getDistance(center, d2.location))
    return 1;
  else return -1;
};

function Index({ className = 'dashboard' }) {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { dispensaries } = useSelector((state) => state.dispensary);
  const [center, setCenter] = useState({ lat: 34.052235, lng: -118.243683 });
  const [sortedDispensaries, setDispensaries] = useState([]);

  useEffect(() => {
    if (dispensaries && center) {
      const temp = JSON.parse(JSON.stringify(dispensaries));
      console.log(temp.sort(compareDistance(center)).map((dispensary, index) => {
        return {
          ...dispensary,
          distance: getDistance(center, dispensary.location)
        }
      }));
      setDispensaries(temp.sort(compareDistance(center)).map((dispensary, index) => {
        return {
          ...dispensary,
          distance: getDistance(center, dispensary.location)
        }
      }));
    }
  }, [dispensaries, center]);

  useEffect(() => {
    dispatch(getDispensaries());
  }, [dispatch]);

  const handleShow = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.container}>
      <Card>
        <GoogleMaps dispensaries={sortedDispensaries} center={center} setCenter={setCenter}/>
      </Card>
      <DispensaryPickup dispensaries={sortedDispensaries}/>
    </div>
  );
}

export default Index;
