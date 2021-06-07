import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fNumber } from 'src/utils/formatNumber';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Link, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';
import { useLocation } from 'react-router';
import faker from 'faker';
import Slider from 'react-slick';
import { getImgFeed } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import {
  CarouselArrowsBasic1,
  CarouselCustomPaging1
} from 'src/components/Carousel';
import {
  varFadeInLeft,
  varFadeInRight,
  MotionContainer
} from 'src/components/Animate';
import { alpha } from '@material-ui/core/styles';
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { ajaxUrl } from 'src/config';

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
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    const curAccessToken = window.localStorage.getItem('accessToken');
    if (curAccessToken && isValidToken(curAccessToken)) {
      setSession(curAccessToken);
      const response = await axios.get(`${ajaxUrl}/api/product/category`);
      console.log(response.data);
      setCategory(response.data);
    }
  }, []);

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
        {category &&
          category.map(({ name, mainImage }) => (
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
                  alt={name}
                  src={mainImage}
                  className={classes.img}
                  // sx={{
                  //   width: '100%',
                  //   objectFit: 'cover',
                  //   height: { xs: 160, xl: 500 }
                  // }}
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
                    {name}
                  </Typography>
                </CardContent>
                {/* <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography
                      component="h5"
                      variant="h5"
                      className={classes.title}
                    >
                      <Link
                        href={
                          location.pathname == '/app/general/discover'
                            ? PATH_APP.management.eCommerce.products
                            : PATH_DISCOVER.general1.products
                        }
                      >
                        {id}
                      </Link>
                    </Typography>
                    <CardMedia className={classes.cover} image={image1} />
                  </CardContent>
                </div> */}
              </Box>
              {/* <CardMedia className={classes.cover} image={image1} /> */}
            </Card>
          ))}
      </div>
    </div>
  );
}

export default DiscoverProducts;
