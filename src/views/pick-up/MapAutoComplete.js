import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { GoogleMap, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Grid, Button, CardHeader, Avatar, Typography, Rating, OutlinedInput, CardMedia } from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import { isOptionalCallExpression } from '@babel/types';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '80vh'
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

const InfoWindowChild = ({ dispensary, center }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none', minHeight: '250px', width: '200px' }}>
      <CardMedia
        image={dispensary.mainImage}
        title="Paella dish"
        sx={{ height: '100px' }}
      />
      <Grid
        xs={12}
        md={12}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Grid xs={12} md={12}>
          <CardHeader
            sx={{ display: 'flex', pt: 3, pl: 3, alignItems: 'flex-start' }}
            avatar={
              <Avatar aria-label="recipe">
                {dispensary.name[0]}
              </Avatar>
            }
            title={dispensary.name}
            subheader={''}
          />
          <Typography sx={{ pl: 3 }}>
            <Rating
              defaultValue={dispensary.rating}
              icon={<StarBorderOutlined fontSize="inherit" />}
              disabled
              size='small'
            />
            {dispensary.rating}
          </Typography>
          <Typography sx={{ pl: 3 }}>{dispensary.type}</Typography>
          <Typography sx={{ pl: 3 }}>{dispensary.orderType}</Typography>
          <Typography sx={{ pl: 3 }}>{dispensary.distance}km</Typography>
        </Grid>
        
        <Button variant="outlined" sx={{ width: '80px', mt: 1, mb: 1 }}>
          <RouterLink 
            style={{ textDecoration: 'none' }}
            to={`${PATH_APP.root}/dispensaryDetail/${dispensary._id}`}
          >
            Visit
          </RouterLink>
        </Button>
      </Grid>
    </Card>
  )
};

MapAutoComplete.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string,
  dispensaries: PropTypes.array,
  center: PropTypes.any,
  setCenter: PropTypes.func,
};

function MapAutoComplete({ themes, className, dispensaries, center, setCenter, ...other }) {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState(false);
  const [dispensaryInfoOpen, setDispensaryInfoOpen] = useState([]);

  const mapOptions = {
    zoom: 14,
    minZoom: 2,
    maxZoom: 24,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: true,
    libraries: ["geometry"]
    // styles: themes.silver
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handleChangePlace = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCenter({ lat, lng });
    } else {
    }
  };

  const isOpenInfo = (index) => {
    return dispensaryInfoOpen[index];
  };

  const setOpenInfo = (index, value) => {
    var temp = JSON.parse(JSON.stringify(dispensaryInfoOpen));
    temp[index] = value;
    setDispensaryInfoOpen(temp);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {dispensaries &&
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
          <Marker
            icon={{
              path:
                'M8 0C3.61277632-.00021937.04387223 3.53299568 0 7.92 0 13.4 7.05 19.5 7.35 19.76c.374224.3200877.925776.3200877 1.3 0C9 19.5 16 13.4 16 7.92 15.9561278 3.53299568 12.3872237-.00021937 8 0zm0 11c-1.9329966 0-3.5-1.5670034-3.5-3.5C4.5 5.56700338 6.0670034 4 8 4s3.5 1.56700338 3.5 3.5c0 .9282577-.3687489 1.8184964-1.0251263 2.4748737C9.8184964 10.6312511 8.9282577 11 8 11z',
              fillColor: theme.palette.error.main,
              fillOpacity: 1.0,
              strokeWeight: 0,
              scale: 3
            }}
            position={{ lat: center.lat, lng: center.lng }}
            onClick={() => {
              setUserInfo(!userInfo);
            }}
          >
            {userInfo && (
              <InfoWindow
                key={`infowindow-your-place`}
                onCloseClick={()=>setUserInfo(false)}
              >
                <div>
                  Your Current Location
                </div>
              </InfoWindow>
            )}
          </Marker>
          {dispensaries.map((dispensary, index) => (
            <Marker
              key={index}
              icon={{
                path:
                  'M8 0C3.61277632-.00021937.04387223 3.53299568 0 7.92 0 13.4 7.05 19.5 7.35 19.76c.374224.3200877.925776.3200877 1.3 0C9 19.5 16 13.4 16 7.92 15.9561278 3.53299568 12.3872237-.00021937 8 0zm0 11c-1.9329966 0-3.5-1.5670034-3.5-3.5C4.5 5.56700338 6.0670034 4 8 4s3.5 1.56700338 3.5 3.5c0 .9282577-.3687489 1.8184964-1.0251263 2.4748737C9.8184964 10.6312511 8.9282577 11 8 11z',
                fillColor: "#3ec4ff",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 3
              }}
              title={dispensary.name}
              position={{ lat: dispensary.location.lat, lng: dispensary.location.lng }}
              onClick={() => {
                setOpenInfo(index, !isOpenInfo(index));
              }}
            >
              {isOpenInfo(index) && (
                <InfoWindow
                  key={`infowindow-${dispensary.name}`}
                  onCloseClick={() => {setOpenInfo(index, false)}}
                >
                  <div>
                    <InfoWindowChild dispensary={dispensary} center={center}/>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      }
    </div>
  );
}

export default MapAutoComplete;
