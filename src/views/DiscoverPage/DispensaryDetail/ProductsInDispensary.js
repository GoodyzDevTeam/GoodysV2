/* eslint-disable */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography, IconButton } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import { Grid, Collapse, CardMedia, CardHeader, CardContent, CardActions } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Block from 'src/components/Block';
import { MBreadcrumbs } from 'src/theme';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteProducts, getCategory, toggleFavoriteProduct } from 'src/redux/slices/product';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingTop: theme.spacing(0),
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
    // margin: theme.spacing(1),
    textAlign: 'left',
    // marginTop: theme.spacing(1),
    // margin: theme.spacing(2),
    height: '100%',
    flexGrow: 2,
    flexShrink: 1,
    // maxWidth: 250,
    // minWidth: 250,
    // maxHeight: 320,
    // minHeight: 320,
    // //tablet
    // ['@media (min-width: 650px) and (max-width: 1175px)']: {
    //   margin: theme.spacing(1),
    //   maxWidth: 300,
    //   minWidth: 300,
    //   maxHeight: 350,
    //   minHeight: 350,
    // },
    // //Large Tablet & Small Desktop
    // ['@media (min-width: 1280px) and (max-width: 1583px)']: {
    //   margin: theme.spacing(1),
    //   maxWidth: 230,
    //   minWidth: 230,
    //   maxHeight: 300,
    //   minHeight: 300,
    // },
    ['@media (min-width: 1584px)']: {
      margin: theme.spacing(1),
      maxWidth: 300,
      minWidth: 300,
      maxHeight: 350,
      minHeight: 350,
    }
		// margin: '5px',
		// height: theme.spacing(50)
  },
  media: {
    height: 0,
    // marginTop: theme.spacing(6),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: '56.25%',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: '100%',
      height: theme.spacing(20),
      paddingTop: 0
    },
    ['@media (min-width: 1280px) and (max-width: 1400px)']: {
      width: '100%',
      height: theme.spacing(15),
      paddingTop: 0
    }
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
  headerBtnContainer: {
    marginLeft: 'auto',
    //dekstop
    ['@media (min-width: 1175px)']: {
      marginLeft: theme.spacing(-20)
      // marginRight: theme.spacing(20)
    }
  },
  HeaderBtn: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(10)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(15)
    },
    //large desktop
    ['@media (min-width: 1524px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(20)
    }
  },
  actions: {
    marginTop: theme.spacing(-3),
    //tablet
    // ['@media (min-width: 650px) and (max-width: 1175px)']: {
    //   marginTop: theme.spacing(0)
    // }
		// display: 'flex',
		// justifyContent: 'space-between',
		// width: '100%',
		// marginTop: theme.spacing(0),
		// position: 'absolute',
		// bottom: 0,
    // //tablet
    // ['@media (min-width: 650px) and (max-width: 1175px)']: {
    //   marginTop: theme.spacing(-4)
    // }
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      margin: theme.spacing(1)
    }
  },
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

const WeightAndPrice = ({ weightAndPrices }) => {
  const classes = useStyles();
  const wp = weightAndPrices ? weightAndPrices.filter((item) => item)[0] : null;
  return (
    <>
      {wp && (
        <>
          <Typography
            className={classes.title}
            variant="subtitle1"
            color="textSecondary"
          >
            ${wp.price}
          </Typography>
          <Typography
            className={classes.title}
            variant="subtitle1"
            color="textSecondary"
          >
            {wp.weight}
          </Typography>
        </>
      )}
    </>
  );
};

ProductsInDispensary.propTypes = {
	category: PropTypes.any,
	products: PropTypes.any
};

function ProductsInDispensary({ category, products, ...other }) {
	console.log(products);
  const classes = useStyles();
  const { favoriteProducts } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	let filteredProducts = (products && category) ? products.filter((p) => p.category == category._id) : [];

	useEffect(() => {
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
    <Grid container>
      <Grid item xs={12}>
				<Typography variant="h3" sx={{ mb: 2, mt: 2 }}>
					{category && category.name}
				</Typography>
			</Grid>
      <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts &&
          filteredProducts.map((product, index) => (
						<Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
							<Card className={classes.root}>
								<CardMedia
									className={classes.media}
									image={product.photos[0]}
									title={product.productName}
								/>
								<Box className={classes.contentContainer}>
									<CardContent className={classes.content}>
										<Typography variant="subtitle2">{product.productName}</Typography>
										<WeightAndPrice weightAndPrices={product.weightAndPrice} />
										<Typography variant="subtitle2">{product.description}</Typography>
									</CardContent>
									<CardActions disableSpacing className={classes.actions}>
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
										<IconButton aria-label="share">
											<ShareIcon />
										</IconButton>
										<Button
											variant="outlined"
											className={classes.visitBtn}
										>
											<RouterLink
												style={{ textDecoration: 'none' }}
												to={`${PATH_APP.root}/productDetail/${product._id}`}
											>
												View
											</RouterLink>
										</Button>
									</CardActions>
								</Box>
							</Card>
						</Grid>
					)
				)}
      </Grid>
    </Grid>
  );
}

export default ProductsInDispensary;
