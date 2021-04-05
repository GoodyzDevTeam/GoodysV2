import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { fNumber } from 'src/utils/formatNumber';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Link, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { PATH_APP } from 'src/routes/paths';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
    width: theme.spacing(38),
    height: theme.spacing(20),
    cursor: 'pointer',
    ['@media (max-width: 1367px)']: {
      margin: theme.spacing(1),
      width: theme.spacing(28),
      height: theme.spacing(20)
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(5)
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    alignItems: 'center'
  },
  cover: {
    width: '50%',
    borderRadius: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

DiscoverProducts.propTypes = {
  className: PropTypes.string
};

function DiscoverProducts({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  // DEMO FILLER(DATA) FOR PRODUCTS
  const demoProduct = [
    {
      id: 'Flowers',
      image1: `https://images.weedmaps.com/categories/000/000/002/avatar/original/1607965277-F-V3.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'Edibles',
      image1: `https://images.weedmaps.com/categories/000/000/005/avatar/original/1607965274-ED-V3.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'Concentrates',
      image1: `https://images.weedmaps.com/categories/000/000/003/avatar/original/1607965267-CC-V3.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'Pre Rolls',
      image1: `https://images.weedmaps.com/categories/000/000/185/avatar/original/1607965288-preroll.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'CBD',
      image1: `https://images.weedmaps.com/categories/000/000/052/avatar/original/1607965592-CBD-v3.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'Topicals',
      image1: `https://images.weedmaps.com/categories/000/000/023/avatar/original/1607965283-TP-V3.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    },
    {
      id: 'Vape Pens',
      image1: `https://images.weedmaps.com/categories/000/000/004/avatar/original/1607965286-Vape_pens.png?w=400&h=300&dpr=1&auto=format&fit=crop`
    }
  ];

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
        {demoProduct.map(({ id, image1 }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    <Link href={PATH_APP.management.eCommerce.products}>
                      {id}
                    </Link>
                  </Typography>
                </CardContent>
              </div>
            </Box>
            <CardMedia className={classes.cover} image={image1} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DiscoverProducts;
