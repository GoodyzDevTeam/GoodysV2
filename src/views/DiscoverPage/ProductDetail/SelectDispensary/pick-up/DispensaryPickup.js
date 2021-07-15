import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Card, Typography, IconButton, Rating } from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

const useStyles = makeStyles((theme) => ({
}));

DispensaryPickup.propTypes = {
  dispensaries: PropTypes.array
};

function DispensaryPickup({ dispensaries }) {
  const classes = useStyles();

  return (
    <Card sx={{ pt: 1, ml: 5, display: 'flex-wrap', width: 'calc(30vw - 150px)', overflowY: 'scroll' }}>
      {dispensaries && dispensaries.map((dispensary, index) => (
        <Grid key={index} xs={12} md={12}>
          <Card sx={{ display: 'flex', flexDirection: 'row', m: 1, maxHeight: '200px', minHeight: '200px' }}>
            <CardMedia
              image={dispensary.mainImage}
              title="Paella dish"
              sx={{ height: '200px', width: '40%'}}
            />
            <Grid
              xs={12}
              md={6}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}
            >
              <Grid xs={12} md={12}>
                <CardHeader
                  sx={{ display: 'flex', pt: 3, pl: 3, alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  avatar={
                    <Avatar aria-label="recipe" sx={{ backgroundColor: '#00AB55' }}>
                      {dispensary.name[0]}
                    </Avatar>
                  }
                  title={dispensary.name}
                  subheader={`${dispensary.distance}km`}
                />
                {/* <Typography sx={{ pl: 3, mt: 2, display:'flex', alignItems: 'center'}}>
                  <Rating
                    defaultValue={dispensary.rating}
                    icon={<StarBorderOutlined fontSize="inherit" />}
                    disabled
                    size='small'
                  />
                  {dispensary.rating}
                </Typography> */}
                {/* <Typography sx={{ pl: 3, mt: 1, fontSize: '12px'}}>{dispensary.type}</Typography>
                <Typography variant='subtitle2' sx={{ pl: 3 }}>{dispensary.orderType}</Typography> */}
                {/* <Typography sx={{ pl: 3, fontSize: '12px' }}>{dispensary.distance}km</Typography> */}
              </Grid>
              
              {/* <Button variant="outlined" sx={{ textAlign: 'left', width: '80px', ml: 2, mb: 1 }}>
                <RouterLink 
                  style={{ textDecoration: 'none' }}
                  to={`${PATH_APP.root}/dispensaryDetail/${dispensary._id}`}
                >
                  Visit
                </RouterLink>
              </Button> */}
            </Grid>
          </Card>
        </Grid>
      ))}
    </Card>
  );
}

export default DispensaryPickup;
