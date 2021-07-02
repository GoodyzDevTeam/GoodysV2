import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import { CardContent, Link } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { map } from 'lodash';
import { paramCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteDispensaries } from 'src/redux/slices/dispensary';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // padding: theme.spacing(3.5),
    width: theme.spacing(50),
    height: theme.spacing(30),
    cursor: 'pointer',
    margin: theme.spacing(1),
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
    // marginRight: 'auto',
    marginBottom: theme.spacing(3),
    //tablet
    ['@media (min-width: 768px)']: {
      width: theme.spacing(43),
      height: theme.spacing(30)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(35),
      height: theme.spacing(30)
    }
  },
  header: {
    marginBottom: theme.spacing(2),
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
    flex: '1 0 auto',
    marginTop: theme.spacing(3)
  },
  cover: {
    width: '55%',
    borderRadius: theme.spacing(1),
    //tablet
    ['@media (min-width: 768px)']: {
      width: '42%'
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: '42%'
    }
  },
  title: {
    marginBottom: theme.spacing(1)
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
          <Card key={index} className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    className={classes.title}
                    component="h6"
                    variant="h6"
                  >
                    {item.dispensary.dispensaryName}
                  </Typography>
                  <Button variant="outlined">
                    <RouterLink
                      style={{ textDecoration: 'none' }}
                      to={''}
                    >
                      Visit
                    </RouterLink>
                  </Button>
                </CardContent>
              </div>
            </Box>
            <CardMedia
              className={classes.cover}
              image={item.dispensary.mainImage}
              title="Live from space album cover"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FavoriteDispensaries;
