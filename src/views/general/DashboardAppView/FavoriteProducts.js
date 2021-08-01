import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography, Grid } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import { CardContent, Link } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { map } from 'lodash';
import { paramCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteProducts } from 'src/redux/slices/product';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 278,
    maxWidth: 278,
    minHeight: 325,
    maxHeight: 325,
    margin: theme.spacing(1),
    ['@media (min-width: 1920px)']: {
      maxWidth: 350,
      maxHeight: 350
    },
  },
  button: {
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(1.5)
  },
  text:{
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

function noProducts (props) {
  return (
    <Grid item xs={12} sx={{backgroundColor: 'red'}}>
      <Card>
        Add something
      </Card>
    </Grid>
  )
}

FavoriteProducts.propTypes = {
  className: PropTypes.string
};

function FavoriteProducts(props,{ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { favoriteProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, [dispatch]);
  
  return (
    <div>
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        <Grid item xs={12} className={classes.header}>
          <Typography variant='h3'>
            Your Favorite Products
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        {favoriteProducts && favoriteProducts.map((item, index) => {
          if(item.product) {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Card key={index} className={clsx(classes.root, className)} {...other}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="160"
                      image={item.product.photos[0]}
                      title="Contemplative Reptile"
                    />
                    <CardContent className={classes.text}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.product.productName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        <WeightAndPrice weightAndPrices={item.product.weightAndPrice} />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button variant="outlined" className={classes.button}>
                      <RouterLink
                        style={{ textDecoration: 'none' }}
                        to={`${PATH_APP.root}/productDetail/${item.product._id}`}
                      >
                        Order Again
                      </RouterLink>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
            // else if(!item.product){
            //   return <noProducts key={index} className={clsx(classes.root, className)} {...other}/>
            // }
        })}
        {!favoriteProducts.filter(product => product.product).length && (
          <Card
            sx={{ width: '100%', minHeight: '200px', display: 'flex',
              justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
            }}
          >
            <Typography>
              Add The Products You Love Here. Lets Heart Some Products
            </Typography>
            <Button>
              <a href="#products">Explore</a> 
            </Button>
          </Card>
        )}
      </Grid>
    </div>
  );
}

export default FavoriteProducts;
