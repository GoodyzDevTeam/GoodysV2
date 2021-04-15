import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { map } from 'lodash';

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

  const demoProduct = [
    {
      id: 'STIIIZY Starter Kit - Black',
      image1: `https://images.weedmaps.com/products/000/054/467/avatar/original/1606349455-STIIIZY_Standard_Battery_-_Black_1.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$60.00',
      weight: '1/2 g'
    },
    {
      id: 'Gelonade - Indoor',
      image1: `https://images.weedmaps.com/products/000/094/852/avatar/original/1552346633-Copy_of_Connected_Indoor_-_Gelonade.png?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$60.00',
      weight: '7g/1oz'
    },
    {
      id: 'Georgia Pie',
      image1: `https://images.weedmaps.com/products/000/146/558/avatar/original/1586277952-Cookies_GeorgiaPie_TM_1000x1000.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$40.00',
      weight: '1/8 oz'
    },
    {
      id: 'Presidential Moon Rocks',
      image1: `https://images.weedmaps.com/products/000/047/612/avatar/original/1568843455-_MOON-strawberry-02.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$90.00',
      weight: '1/8 oz'
    },
    {
      id: 'PLUS Uplift Sour Gummies',
      image1: `https://images.weedmaps.com/products/000/062/933/avatar/original/1573250508-watermelon.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$25.00',
      weight: ''
    },
    {
      id: 'Kwik Ease - 100mg',
      image1: `https://images.weedmaps.com/products/000/094/440/avatar/original/1551985413-KwikEasePineappleExpress-1.png?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$20.00',
      weight: '100mg'
    },
    {
      id: 'Mango CBD - LIIIL STIIIZY',
      image1: `https://images.weedmaps.com/products/000/105/089/avatar/original/1607454077-STIIIZY_LIIIL__NV__-_Mango__CBD__1.png?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$30.00',
      weight: '1.5 g'
    },
    {
      id: 'TONIK: KIWI STRAWBERRY',
      image1: `https://images.weedmaps.com/products/000/193/328/avatar/original/1615352295-winner.png?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$60.00',
      weight: '100 mg'
    },
    {
      id: 'Pacific Stone | Wedding Cake Pre-Roll',
      image1: `https://images.weedmaps.com/products/000/174/069/avatar/original/1610148887-0.5g_Pre-Roll_Box_-_Wedding_Cake_Indica.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$50.00',
      weight: '1/8 oz'
    },
    {
      id: 'KAVIAR CONES - HYBRID',
      image1: `https://images.weedmaps.com/products/000/034/366/avatar/original/kaviar_cones.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$28.00',
      weight: '2 g'
    },
    {
      id: 'PINEAPPLE EXPRESS DISTILLATE',
      image1: `https://images.weedmaps.com/products/000/087/252/avatar/original/1595615442-PINEAPPLE.jpg?w=300&h=300&dpr=1&auto=format&fit=crop&fill=solid`,
      price: '$60.00',
      weight: '1/2 g'
    }
  ];

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
        {demoProduct.map(({ id, price, image1, weight }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1, width: '50%' }}>
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
                  <Button variant="outlined"> View </Button>
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

export default ProductsUMayLike;
