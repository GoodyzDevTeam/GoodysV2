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
import CheckoutDialog from './CheckoutDialog';
// ----------------------------------------------------------------------


const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
		zIndex: '1999 !important',
		position: 'fixed',
		width: '100vw',
		height: '90vh',
		overflowY: 'scroll',
		left: 0,
    borderRadius: '20px',
		[theme.breakpoints.up('md')]: {
			width: '60vw',
			left: '20vw',
    },
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
			width: '60vw'
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
          <TableBody>
            {product && quantity && product.weightAndPrice.map((wp, idx) => {
              return (
                <>
                  {wp && (
                    <TableRow key={idx}>
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
          </TableBody>
        </Table>
      </div>
    </>
  );
};

CartDialog.propTypes = {
	open: PropTypes.any,
	setOpen: PropTypes.func,
	cartDispensaries: PropTypes.any,
	setCartDispensaries: PropTypes.func,
	orderProducts: PropTypes.any,
	setOrderProducts: PropTypes.func,
};

function CartDialog({ open, setOpen, cartDispensaries, setCartDispensaries, orderProducts, setOrderProducts }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { checkout, favoriteProducts } = useSelector((state) => state.product);
  const [isCheckout, setIsCheckout] = useState(false);

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
		<>
			<Box
				onClick={handleCloseSettings}
				sx={{
					position: 'fixed',
					width: '100vw',
					height: '100vh',
					top: 0,
					left: 0,
					background: 'black',
					opacity: 0.6,
					zIndex: 5,
				}}
			/>

			<Card
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

				{isCheckout &&
					<CheckoutDialog
						products={orderProducts}
						onSuccess={handleOrderSuccess}
						onClose={() => {setIsCheckout(false)}}
					/>
				}

				{!isCheckout &&
					<Grid item xs={12} md={12} className={classes.cartHolder}>
						{checkout && checkout.cart && <Grid xs={12} md={8}>
							{cartDispensaries && cartDispensaries.map((dispensary, index) => {
								const products = checkout.cart.filter((product) => product.dispensary._id == dispensary._id);
								return (
									<Card sx={{ m: 2 }}>
										<Box sx={{ p: 2.5 }}>
											<Card key={index} sx={{ flexDirection: 'row', display: 'flex', height: 'auto' }}>
												<CardMedia
													className={classes.media}
													image={dispensary.mainImage}
													title="Paella dish"
												/>
												<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
													<Typography variant="h4">{dispensary.name}</Typography>
													<Typography sx={{ mt: 1, mb: 1 }}>{dispensary.type}</Typography>

													<StyledRating
														defaultValue={4.8}
														getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
														icon={<StarBorderOutlined fontSize="large" />}
														className={classes.rating}
														disabled
														size='medium'
													/>
													<Button variant="outlined">
														<RouterLink 
															style={{ textDecoration: 'none' }}
															to={`${PATH_APP.root}/dispensaryDetail/${dispensary._id}`}
														>
															Go on Shopping
															<ArrowForwardIcon sx={{ paddingTop: '10px', marginBottom: '-3px' }}/>
														</RouterLink>
													</Button>
												</CardContent>
											</Card>
										</Box>
										<Box sx={{ p: 2.5 }}>
											{products && products.map((product, idx) => (
												<>
													<Card key={idx} sx={{ display: 'flex', m: 3, mb: 5 }}>
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
																<Button onClick={() => handlePurchaseProduct(product)} sx={{ float: 'right' }}>
																	Purchase
																</Button>
																<Button sx={{ float: 'right' }}>
																	<RouterLink
																		style={{ textDecoration: 'none' }}
																		to={`${PATH_APP.root}/productDetail/${product._id}`}
																	>
																		View
																	</RouterLink>
																</Button>
																<Button
																	onClick={() => handleRemove(product)}
																	sx={{ float: 'right', color: 'gray' }}
																>
																	<DeleteIcon />
																</Button>
															</Box>
														</Box>
													</Card>
												</>
											))}
										</Box>
									</Card>
								);
							})}
						</Grid>}

						<Grid item xs={12} md={4} sx={{ p: 3 }}>
							<Summary total={checkout.total} subtotal={checkout.subtotal}/>
						</Grid>
					</Grid>
				}
			</Card>
		</>
  );
}

export default CartDialog;
