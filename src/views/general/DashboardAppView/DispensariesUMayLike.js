import { merge } from 'lodash';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Grid, CardHeader, Button, Typography, Box } from '@material-ui/core';
import { getImgDispensary } from 'src/utils/getImages';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { getDispensaries, toggleFavoriteDispensary, getFavoriteDispensaries } from 'src/redux/slices/dispensary';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    // minWidth: 300,
    maxWidth: 300,
    // minHeight: 450,
    maxHeight: 450,
    ['@media (min-width: 1920px)']: {
      maxWidth: 350,
      maxHeight: 440
    },  
  },
  titleText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: theme.spacing(-3),
    textOverflow: 'ellipsis'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  display: {
    display: 'flex'
  },
  title1: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-3)
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%'
  },
  avatar: {
    backgroundColor: '#00AB55'
  },
  header: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(2),
    // marginLeft: theme.spacing(2)
  },
  HeaderBtn: {
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 150,
    borderRadius: theme.spacing(1)
  },
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

DispensariesUMayLike.propTypes = {
  className: PropTypes.string
};

function DispensariesUMayLike({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { dispensaries, favoriteDispensaries } = useSelector((state) => state.dispensary);

  useEffect(() => {
    dispatch(getDispensaries());
    dispatch(getFavoriteDispensaries());
  }, [dispatch]);

  const demoProduct = [
    {
      id2: 'Med Men',
      rating: '4.2 stars ',
      distance: '0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cana',
      rating: '4.0 stars ',
      distance: 'Canoga Park | 0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cloud 3C',
      rating: '4.1 stars ',
      distance: '0.8 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Med Men',
      rating: '4.2 stars ',
      distance: '0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cana',
      rating: '4.0 stars ',
      distance: 'Canoga Park | 0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cloud 3C',
      rating: '4.1 stars ',
      distance: '0.8 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    }
  ];

  const checkIfFavorite = (id) => {
    if (!favoriteDispensaries) return false;
    let filtered = favoriteDispensaries.filter((item) => item.dispensary._id == id);
    if (filtered.length > 0) return true;
    return false;
  };

  const onHandleFavorite = (id) => {
    dispatch(toggleFavoriteDispensary(id));
  }

  return (
    <div id="dispensaries">
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        <Grid item xs={12} className={classes.header}>
          <Typography variant='h3'>
            Dispo's You May Like
          </Typography>
        </Grid>
      </Grid>
      {/* <div className={classes.display}> */}
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        {dispensaries && favoriteDispensaries &&
          dispensaries.map(
            (dispensary, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card key={index} className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {dispensary.name[0]}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={dispensary.name}
                    subheader={dispensary.rating}
                    className={classes.titleText}
                  />
                  <CardMedia
                    className={classes.media}
                    image={dispensary.mainImage}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography>{dispensary.type}</Typography>
                    <Typography>{dispensary.distance}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() => onHandleFavorite(dispensary._id)}
                      aria-label="add to favorites"
                    >
                      <FavoriteIcon
                        sx={
                          checkIfFavorite(dispensary._id)
                          ? { color: 'red' }
                          : { color: 'gray' }
                        }
                      />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <Button variant="outlined" className={classes.visitBtn}>
                      <RouterLink 
                        style={{ textDecoration: 'none' }}
                        to={`${PATH_APP.general.discover}/dispensaryDetail/${dispensary._id}`}
                      >
                        Visit
                      </RouterLink>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      {/* </div> */}
    </div>
  );
}

export default DispensariesUMayLike;
