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
import { makeStyles, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Drawer, Divider, Typography, Card, Grid } from '@material-ui/core';
import { CardMedia, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteProduct, deleteCart, updateQuantity } from 'src/redux/slices/product';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 600;

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

// ----------------------------------------------------------------------

const WeightAndPrice = ({ product }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quantity) {
      dispatch(updateQuantity({
        product: product,
        quantity: quantity,
      }));
    }
  }, [quantity]);

  let subTotal = 0;

  product.weightAndPrice.map((wp, idx) => {
    if (wp) subTotal += wp.price * quantity[idx];
  });

  const QuantityAndPrice = ({ idx }) => {
		return (
			<Grid
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					border: 'solid thin #637381',
					borderRadius: '12px',
					width: '100px',
					justifyContent: 'center',
					p: 1
				}}
			>
				<QuantityButton
          onClick={() => {
            let temp = JSON.parse(JSON.stringify(quantity));
            if (temp[idx] == undefined || temp[idx] == null) temp[idx] = 0;
            temp[idx] = Math.max(0, temp[idx] - 1);
            setQuantity(temp);
          }}
          size="small" 
        >
					<MinusIcon />
				</QuantityButton>
				<input
          type="number"
          disabled
          value={(quantity[idx] == undefined || quantity[idx] == null) ? 0 : quantity[idx]}
          style={{
            border: 'none',
            width: '50px',
            textAlign: 'center',
            backgroundColor: 'white'
          }}
        />
				<QuantityButton
          onClick={() => {
            let temp = JSON.parse(JSON.stringify(quantity));
            if (temp[idx] == undefined || temp[idx] == null) temp[idx] = 0;
            temp[idx] = temp[idx] + 1;
            setQuantity(temp);
          }}
          size="small"
        >
					<PlusIcon />
				</QuantityButton>
      </Grid>
		);
  };

  return (
    <>
      <Box
        fullWidth
        sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}
      >
        <Typography>{product.productName}</Typography>
        <Typography sx={{ color: '#00AB55' }}>SubTotal: $ {subTotal}</Typography>
      </Box>
      <div className={classes.tableHolder}>
        <Table className={classes.table}>
          {/* <TableHead>
            <TableCell>Price</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sum</TableCell>
          </TableHead> */}
          {product && quantity && product.weightAndPrice.map((wp, idx) => {
            return (
              <>
                {wp && (
                  <TableRow>
                    <TableCell>$ {wp.price}</TableCell>
                    <TableCell>{wp.weight}</TableCell>
                    <TableCell>
                      <QuantityAndPrice idx={idx} />
                    </TableCell>
                    <TableCell>$ {wp.price * quantity[idx]}</TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
        </Table>
      </div>
    </>
  );
};

Cart.propTypes = {
  className: PropTypes.string
};

function Cart({ className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { checkout, favoriteProducts } = useSelector((state) => state.product);

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

  return (
    <div className={clsx(classes.root, className)}>
      <MIconButton onClick={handleOpenSettings}>
        {/* <Icon icon={CartIcon} width={20} height={20} /> */}
        <CartIcon />
      </MIconButton>

      <Drawer
        open={open}
        anchor="right"
        onClose={handleCloseSettings}
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper
        }}
      >
        <Box
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1">Your Cart</Typography>
          <MIconButton onClick={handleCloseSettings}>
            <Icon icon={closeFill} width={20} height={20} />
          </MIconButton>
        </Box>
        <Divider />

        <Box sx={{ p: 2.5 }}>
          {checkout && checkout.cart && checkout.cart.map((product, idx) => (
            <>
              <Card sx={{ display: 'flex', m: 3, mb: 5 }}>
                <CardMedia
                  sx={{ width: '200px'}}
                  image={product.photos[0]}
                />
                <Box>
                  <CardContent>
                    <WeightAndPrice product={product} />
                  </CardContent>
                  <Box sx={{ pl: 3, pr: 4 }}>
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
                      onClick={() => handleRemove(product)}
                      sx={{ float: 'right', ml: 1 }}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ float: 'right', ml: 1 }}
                    >
                      <RouterLink
                        style={{ textDecoration: 'none' }}
                        to={`${PATH_APP.root}/productDetail/${product._id}`}
                      >
                        View
                      </RouterLink>
                    </Button>
                  </Box>
                </Box>
              </Card>
            </>
          ))}
        </Box>
      </Drawer>
    </div>
  );
}

export default Cart;
