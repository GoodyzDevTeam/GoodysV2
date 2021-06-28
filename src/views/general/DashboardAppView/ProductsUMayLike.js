import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikeProducts } from 'src/redux/slices/product';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { map } from 'lodash';
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { ajaxUrl } from 'src/config';

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
    // margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    // marginRight: 'auto',
    marginBottom: theme.spacing(3),
    cursor: 'pointer',
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
    marginTop: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  cover: {
    width: '60%',
    borderRadius: theme.spacing(1),
    //tablet
    ['@media (min-width: 768px)']: {
      width: '42%'
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: '42%'
    }
  }
}));

// ----------------------------------------------------------------------

ProductsUMayLike.propTypes = {
  className: PropTypes.string
};

function ProductsUMayLike({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(async () => {
    dispatch(getLikeProducts());
  }, [dispatch]);

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Products You May Like</h1>
      </div>
      <div className={classes.display}>
        {products &&
          products.map((product, index) => {
            console.log(product);
            return (
              <Card className={clsx(classes.root, className)} {...other}>
                <Box sx={{ flexGrow: 1, width: '50%' }}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography
                        className={classes.title}
                        component="h6"
                        variant="h6"
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        className={classes.title}
                        variant="subtitle1"
                        color="textSecondary"
                      >
                        {product.price}
                      </Typography>
                      <Typography
                        className={classes.title}
                        variant="subtitle1"
                        color="textSecondary"
                      >
                        {product.weight}
                      </Typography>
                      <Button variant="outlined"> View </Button>
                    </CardContent>
                  </div>
                </Box>
                <CardMedia
                  className={classes.cover}
                  image={product.photos[0]}
                  title="Live from space album cover"
                />
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsUMayLike;
