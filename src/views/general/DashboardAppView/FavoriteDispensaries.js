import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Card, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import { CardContent, CardHeader, Link } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteDispensaries } from 'src/redux/slices/dispensary';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%'
  },
  header: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
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

FavoriteDispensaries.propTypes = {
  className: PropTypes.string
};

function FavoriteDispensaries({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { favoriteDispensaries } = useSelector((state) => state.dispensary);

  useEffect(() => {
    dispatch(getFavoriteDispensaries());
  }, [dispatch]);

  return (
    <div>
      <div className={classes.header}>
        <h1>Your Favorite Dispensaries</h1>
      </div>
      <div className={classes.display}>
        {favoriteDispensaries && favoriteDispensaries.map((item, index) => (
          <Grid xs={12} md={3} sx={{ p: 3 }} >
            <Card key={index} className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item.dispensary.name[0]}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.dispensary.name}
                subheader={item.dispensary.rating}
              />
              <CardMedia
                className={classes.media}
                image={item.dispensary.mainImage}
                title="Paella dish"
              />
              <CardContent>
                <Typography>{item.dispensary.type}</Typography>
                <Typography>{item.dispensary.distance}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                {/* <IconButton
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
                </IconButton> */}
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Button variant="outlined" className={classes.visitBtn}>
                  Visit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default FavoriteDispensaries;
