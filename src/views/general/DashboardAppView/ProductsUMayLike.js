import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, toggleFavoriteProduct, getFavoriteProducts } from 'src/redux/slices/product';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography, IconButton } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 278,
    maxHeight: 325,
    margin: theme.spacing(2),
  },
  button: {
    // marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(1.5)
  },
  actions:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // backgroundColor: 'red'
  },
  text:{
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: theme.spacing(-3),
    textOverflow: 'ellipsis'
  },
  // root: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   // alignItems: 'center',
  //   // padding: theme.spacing(3.5),
  //   width: theme.spacing(50),
  //   height: theme.spacing(30),
  //   cursor: 'pointer',
  //   margin: theme.spacing(1),
  //   cursor: 'pointer',
  //   marginLeft: theme.spacing(2),
  //   // marginRight: 'auto',
  //   marginBottom: theme.spacing(3),
  //   //tablet
  //   ['@media (min-width: 768px)']: {
  //     width: theme.spacing(43),
  //     height: theme.spacing(30)
  //   },
  //   //desktop
  //   ['@media (min-width: 1024px)']: {
  //     width: theme.spacing(35),
  //     height: theme.spacing(30)
  //   }
  // },
  header: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  // details: {
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  // content: {
  //   flex: '1 0 auto',
  //   marginTop: theme.spacing(3)
  // },
  // cover: {
  //   width: '55%',
  //   borderRadius: theme.spacing(1),
  //   //tablet
  //   ['@media (min-width: 768px)']: {
  //     width: '42%'
  //   },
  //   //desktop
  //   ['@media (min-width: 1024px)']: {
  //     width: '42%'
  //   }
  // },
  weightAndPrice:{
    display:'flex',
    flexDirection:'row'
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  title1: {
    marginLeft: theme.spacing(5)
  }
  // root: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   // alignItems: 'center',
  //   // padding: theme.spacing(3.5),
  //   width: theme.spacing(50),
  //   height: theme.spacing(30),
  //   cursor: 'pointer',
  //   // margin: theme.spacing(1),
  //   marginLeft: theme.spacing(2),
  //   // marginRight: 'auto',
  //   marginBottom: theme.spacing(3),
  //   cursor: 'pointer',
  //   //tablet
  //   ['@media (min-width: 768px)']: {
  //     width: theme.spacing(43),
  //     height: theme.spacing(30)
  //   },
  //   //desktop
  //   ['@media (min-width: 1024px)']: {
  //     width: theme.spacing(35),
  //     height: theme.spacing(30)
  //   }
  // },
  // header: {
  //   marginBottom: theme.spacing(2),
  //   marginLeft: theme.spacing(2)
  // },
  // display: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap'
  // },
  // details: {
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  // content: {
  //   flex: '1 0 auto',
  //   marginTop: theme.spacing(2)
  // },
  // title: {
  //   marginBottom: theme.spacing(1)
  // },
  // cover: {
  //   width: '60%',
  //   borderRadius: theme.spacing(1),
  //   //tablet
  //   ['@media (min-width: 768px)']: {
  //     width: '42%'
  //   },
  //   //desktop
  //   ['@media (min-width: 1024px)']: {
  //     width: '42%'
  //   }
  // }
}));

// ----------------------------------------------------------------------

const WeightAndPrice = ({ weightAndPrices }) => {
  const classes = useStyles();
  const wp = weightAndPrices ? weightAndPrices.filter((item) => item)[0] : null;
  return (
    <div className={classes.weightAndPrice}>
      {wp && (
        <>
          <Typography
            className={classes.title}
            variant="subtitle1"
            color="textSecondary"
          >
            {wp.weight}
          </Typography>
          <Typography
            className={classes.title1}
            variant="subtitle1"
            color="textSecondary"
          >
            ${wp.price}
          </Typography>
        </>
      )}
    </div>
  );
};

ProductsUMayLike.propTypes = {
  className: PropTypes.string
};

function ProductsUMayLike({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, favoriteProducts } = useSelector((state) => state.product);

  useEffect(async () => {
    dispatch(getProducts());
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  const onHandleFavorite = (id) => {
    dispatch(toggleFavoriteProduct(id));
  }

  const checkIfFavorite = (id) => {
    if (!favoriteProducts) return false;
    let filtered = favoriteProducts.filter((item) => item.product._id == id);
    if (filtered.length > 0) return true;
    return false;
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Products You May Like</h1>
      </div>
      <div className={classes.display}>
        {products &&
          products.map((product, index) => {
            return (

              <Card key={index} className={clsx(classes.root, className)} {...other}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={product.photos[0]}
                    title="Contemplative Reptile"
                  />
                  <CardContent className={classes.text}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <WeightAndPrice weightAndPrices={product.weightAndPrice} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => onHandleFavorite(product._id)}
                  >
                    <FavoriteIcon
                      sx={
                        checkIfFavorite(product._id)
                        ? { color: 'red' }
                        : { color: 'gray' }
                      }
                    />
                  </IconButton>
                  <Button variant="outlined" className={classes.button}>
                    <RouterLink
                      style={{ textDecoration: 'none' }}
                      to={`${PATH_APP.root}/productDetail/${product._id}`}
                    >
                      View
                    </RouterLink>
                  </Button>
                </CardActions>
              </Card>

              // <Card className={clsx(classes.root, className)} {...other}>
              //   <Box sx={{ flexGrow: 1, width: '50%' }}>
              //     <div className={classes.details}>
              //       <CardContent className={classes.content}>
              //         <Typography
              //           className={classes.title}
              //           component="h6"
              //           variant="h6"
              //         >
              //           {product.productName}
              //         </Typography>
              //         <WeightAndPrice weightAndPrices={product.weightAndPrice} />
              //         <IconButton
              //           aria-label="add to favorites"
              //           onClick={() => onHandleFavorite(product._id)}
              //         >
              //           <FavoriteIcon
              //             sx={
              //               checkIfFavorite(product._id)
              //               ? { color: 'red' }
              //               : { color: 'gray' }
              //             }
              //           />
              //         </IconButton>
              //         <Button variant="outlined">
              //           <RouterLink
              //             style={{ textDecoration: 'none' }}
              //             to={`${PATH_APP.root}/productDetail/${product._id}`}
              //           >
              //             View
              //           </RouterLink>
              //         </Button>
              //       </CardContent>
              //     </div>
              //   </Box>
              //   <CardMedia
              //     className={classes.cover}
              //     image={product.photos[0]}
              //     title="Live from space album cover"
              //   />
              // </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsUMayLike;
