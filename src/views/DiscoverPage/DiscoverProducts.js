/* eslint-disable */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';
import { useLocation } from 'react-router';
import { alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from 'src/redux/slices/product';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
    margin: theme.spacing(1),
    width: theme.spacing(50),
    height: theme.spacing(20),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      width: theme.spacing(20),
      height: theme.spacing(20)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(20),
      height: theme.spacing(20)
    },
    //large desktop
    ['@media (min-width: 1524px)']: {
      width: theme.spacing(30),
      height: theme.spacing(30)
    }
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    display: 'relative'
    // zIndex: '2'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(5)
  },
  // content: {
  //   flex: '1 0 auto',
  //   display: 'flex',
  //   alignItems: 'center'
  // },
  img: {
    width: '100%',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      height: theme.spacing(20)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      height: theme.spacing(20)
    },
    //large desktop
    ['@media (min-width: 1524px)']: {
      height: theme.spacing(30)
    }
    // borderRadius: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

DiscoverProducts.propTypes = {
  className: PropTypes.string
};

function DiscoverProducts({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [location, setLocation] = React.useState(useLocation());
  const { categories } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Browse By Category</h1>
      </div>
      <div className={classes.display}>
        {categories &&
          categories.map((category, index) => (
            <RouterLink key={index} to={`discover/${category._id}`}>
              <Card className={clsx(classes.root, className)} {...other}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      top: 0,
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.12)
                    }}
                  />
                  <Box
                    component="img"
                    alt={category.name}
                    src={category.mainImage}
                    className={classes.img}
                  />
                  <CardContent
                    sx={{
                      bottom: 30,
                      width: '100%',
                      textAlign: 'center',
                      position: 'absolute',
                      color: 'common.white'
                    }}
                  >
                    <Typography variant="h5" gutterBottom noWrap>
                      {category.name}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </RouterLink>            
          ))}
      </div>
    </div>
  );
}

export default DiscoverProducts;
