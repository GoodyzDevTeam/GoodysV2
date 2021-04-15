import clsx from 'clsx';
import React from 'react';
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
import { name } from 'faker';

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

FavoriteProducts.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function FavoriteProducts({ product, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const demoProduct = [
    {
      id: 'Garry Payton',
      description: 'Lorem ipsum dolor sit amet',
      image1: `https://images.weedmaps.com/pictures/users/000/276/562/original/95677461_garypayton.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$60.00',
      weight: '1/8 oz'
    },
    {
      id: 'Marathon OG',
      description: 'Lorem ipsum dolor sit amet',
      image1: `https://images.weedmaps.com/products/000/070/686/avatar/original/1612937082-MOG-2.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$50.00',
      weight: '1/8 oz'
    },
    {
      id: 'Pink Runtz',
      description: 'Lorem ipsum dolor sit amet',
      image1: `https://images.weedmaps.com/products/000/097/055/avatar/original/1613074952-pink-picasso_eighthbox.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$65.00',
      weight: '1/8 oz'
    },
    {
      id: 'Wedding Cake Vape',
      description: 'Lorem ipsum dolor sit amet',
      image1: `https://images.weedmaps.com/products/000/193/618/avatar/original/1599770660-vapeflavors-17.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$40.00',
      weight: ''
    }
  ];

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Your Favorite Products</h1>
      </div>
      <div className={classes.display}>
        {demoProduct.map(({ id, description, image1, price, weight }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    className={classes.title}
                    component="h6"
                    variant="h6"
                  >
                    {id}
                  </Typography>
                  <Typography
                    className={classes.title}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {price}
                  </Typography>
                  <Typography
                    className={classes.title}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {weight}
                  </Typography>
                  <Link>
                    <Button variant="outlined">Order Again</Button>
                  </Link>
                </CardContent>
              </div>
            </Box>
            <CardMedia
              className={classes.cover}
              image={image1}
              title="Live from space album cover"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FavoriteProducts;
