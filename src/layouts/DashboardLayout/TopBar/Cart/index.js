import clsx from 'clsx';
import PropTypes from 'prop-types';
import ThemeMode from './ThemeMode';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import ThemeDirection from './ThemeDirection';
import closeFill from '@iconify-icons/eva/close-fill';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MinusIcon from '@material-ui/icons/Remove';
import PlusIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles, experimentalStyled as styled, withStyles } from '@material-ui/core/styles';
import { Box, Drawer, Divider, Typography, Card, Grid, Avatar } from '@material-ui/core';
import { CardMedia, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Button, IconButton, Rating, TextField } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteProduct, deleteCart, updateQuantity, getCart } from 'src/redux/slices/product';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import Summary from './Summary';
import CartDialog from './CartDialog';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = '50vw';

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    zIndex: '1999 !important'
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH
    },
  },
  cartHolder: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    }
  },
  rating: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  media: {
    width: '180px',
    height: 'auto',
    maxHeight: '300px',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: '300px',
      height: 'auto',
    }
  },
  tableHolder: {
    "& table": {
      borderRadius: "10px",
      background: '#F4F6F8',
    }
  }
}));

const QuantityButton = styled(Button)(({ theme }) => ({
  width: '20px',
  maxWidth: '20px',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%'
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
	},
})(Rating);
// ----------------------------------------------------------------------

Cart.propTypes = {
  className: PropTypes.string
};

function Cart({ className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { checkout, favoriteProducts } = useSelector((state) => state.product);
  const [cartDispensaries, setCartDispensaries] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
		return () => {
      setCartDispensaries();
      setOrderProducts();
		}
  }, []);

  useEffect(() => {
    let temp = [];
    if (checkout.cart) {
      checkout.cart.map((product) => {
        if (!temp.some(dispensary => dispensary._id == product.dispensary._id )) {
          temp.push(product.dispensary);
        }
      });
    }
    setCartDispensaries(temp);
    // dispatch(getSubTotal());
  }, [checkout, checkout.cart]);

  useEffect(() => {
    dispatch(getCart(checkout.cart));
  }, [checkout.cart]);

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  const onHandleFavorite = (id) => {
    dispatch(toggleFavoriteProduct(id));
  };

  const handleRemove = (_product) => {
    dispatch(deleteCart(_product));
  };

  const checkIfFavorite = (id) => {
    if (!favoriteProducts) return false;
    let filtered = favoriteProducts.filter((item) => item.product._id == id);
    if (filtered.length > 0) return true;
    return false;
  };

  const handlePurchaseProduct = (product) => {
    setOrderProducts([product]);
    setIsCheckout(true);
  };

  const handleOrderSuccess = (products) => {
    products.map((product) => {
      dispatch(deleteCart(product));
    })
  };

  return (
    <div className={clsx(classes.root, className)}>
      <MIconButton onClick={handleOpenSettings}>
        {/* <Icon icon={CartIcon} width={20} height={20} /> */}
        <CartIcon />
      </MIconButton>
      
      {open &&
        <CartDialog
          open={open}
          setOpen={setOpen}
          cartDispensaries={cartDispensaries}
          setCartDispensaries={setCartDispensaries}
          orderProducts={orderProducts}
          setOrderProducts={setOrderProducts}
        />
      }
    </div>
  );
}

export default Cart;
