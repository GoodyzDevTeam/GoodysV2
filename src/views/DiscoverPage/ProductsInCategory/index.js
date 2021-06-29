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
import { getProductsByCategory, getCategory } from 'src/redux/slices/product';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(45),
    padding: theme.spacing(3.5),
    margin: theme.spacing(1),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: theme.spacing(28),
      height: theme.spacing(40),
      padding: theme.spacing(0)
    }
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: '100%',
      height: theme.spacing(10),
      marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(0),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginTop: theme.spacing(-4)
    }
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

ProductsInCategory.propTypes = {
  className: PropTypes.string
};

function ProductsInCategory({ className, ...other }) {
  const classes = useStyles();
  const { products, category } = useSelector((state) => state.product);
	const [deal, setDeal] = useState([]);
	const dispatch = useDispatch();
	const { categoryId } = useParams();

  useEffect(() => {
		dispatch(getProductsByCategory(categoryId));
		dispatch(getCategory(categoryId));
  }, [dispatch]);

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };

  return (
    <div>
      <Grid item xs={12}>
				<Typography variant="h3" sx={{ mb: 2 }}>
					{category && category.name}
				</Typography>
				<MBreadcrumbs
					sx={{ fontSize: '20px', mb: 3 }}
					links={[
						{ name: 'Dashboard', href: `${PATH_APP.general.root}` },
						{ name: 'Discover', href: `${PATH_APP.general.discover}` },
						{ name: `${category && category.name}`, href: '#' }
					]}
				/>
			</Grid>
      <div className={classes.display}>
        {products &&
          products.map((product, index) => (
						<Card className={classes.root}>
							<CardMedia
								className={classes.media}
								image={product.photos[0]}
								title={product.productName}
							/>
							<Box className={classes.contentContainer}>
								<CardContent className={classes.content}>
									<Typography variant="subtitle2">{product.productName}</Typography>
									<Typography variant="subtitle2">{product.description}</Typography>
								</CardContent>
								<CardActions disableSpacing className={classes.actions}>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<Button
										variant="outlined"
										className={classes.visitBtn}
									>
										<RouterLink to={`${PATH_APP.root}/productDetail/${product._id}`}>
											View
										</RouterLink>
									</Button>
								</CardActions>
							</Box>
						</Card>
					)
				)}
      </div>
    </div>
  );
}

export default ProductsInCategory;
