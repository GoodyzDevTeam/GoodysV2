import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh'
  },
  search: {
    top: 50,
    left: 0,
    right: 0,
    width: 240,
    margin: 'auto',
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.shadows[25].z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

GoogleMapAutocomplete.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapAutocomplete({ themes, className, ...other }) {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const center = { lat: 34.052235, lng: -118.243683 };
  const mapOptions = {
    zoom: 14,
    minZoom: 2,
    maxZoom: 24,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: true
    // styles: themes.silver
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handleChangePlace = () => {
    if (autocomplete !== null) {
      // autocomplete.getPlace();
    } else {
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        {...other}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={handleChangePlace}>
          <OutlinedInput
            type="text"
            size="small"
            placeholder="Enter your address"
            className={classes.search}
          />
        </Autocomplete>
      </GoogleMap>
    </div>
  );
}

export default GoogleMapAutocomplete;
