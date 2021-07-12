/* eslint-disable */
import {
	Container,
	Grid,
  Card,
	Button,
	Rating,
	Table,
	TableHead,
	TableBody,
	TableRow,
  TableCell,
  IconButton,
	Typography,
	Box
} from '@material-ui/core';
import { alpha, experimentalStyled as styled, makeStyles, withStyles } from '@material-ui/core/styles';
import { MBreadcrumbs } from 'src/theme';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import EditAttributesOutlined from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import MinusIcon from '@material-ui/icons/Remove';
import PlusIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import Page from 'src/components/Page';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory, getProduct, toggleFavoriteProduct } from 'src/redux/slices/product';
import ProductPhoto from './ProductPhoto';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';
import OrderDialog from './OrderDialog';
import Checkout from './CheckoutView';

// routes
import { PATH_DASHBOARD } from 'src/routes/paths';

const useStyles = makeStyles((theme) => ({
	cover: {
		width: '60%',
		height: '100%',
		borderRadius: theme.spacing(1),
		//tablet
		['@media (min-width: 768px)']: {
			width: '42%'
		},
		//desktop
		['@media (min-width: 1024px)']: {
			width: '42%'
		}
	},
	mainDetail: {
		p: 0, pb: 3, m: 0, display: 'flex', flexDirection: 'column', width: '100%',
		[theme.breakpoints.up('md')]:{
			flexDirection: 'row'
		}
	}
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
	},
})(Rating);

const ControlButton = styled(Button)(({ theme }) => ({
	width: '50px',
	height: '50px',
	border: 'solid thick #637381'
}));

const QuantityButton = styled(Button)(({ theme }) => ({
  width: '20px',
  maxWidth: '20px',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%'
}));

const dateFormat = (date) => {
	let split = date.split('-');
	if (split[1].length == 1) split[1] = `0${split[1]}`;
	if (split[2].length == 1) split[2] = `0${split[2]}`;
	return `${split[0]}-${split[1]}-${split[2]}`;
};

// ----------------------------------------------------------------------

export default function ProductPreview() {
	const classes = useStyles();
  const dispatch = useDispatch();
  const { product, category, favoriteProducts } = useSelector((state) => state.product);
  const { dispensary } = useSelector((state) => state.dispensary);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [isOrderShow, setOrderShow] = useState(false);
  const [isOrderDialog, setOrderDialog] = useState(false);
  const [orderType, setOrderType] = useState('');
	const [orderTime, setOrderTime] = useState('');
	const today = dateFormat(`${(new Date()).getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
	const [orderDate, setOrderDate] = useState(today);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  useEffect(() => {
    product && dispatch(getCategory(product.category));
  }, [product]);

  const onHandleFavorite = (id) => {
    dispatch(toggleFavoriteProduct(id));
  }

  const checkIfFavorite = (id) => {
    if (!favoriteProducts) return false;
    let filtered = favoriteProducts.filter((item) => item.product._id == id);
    if (filtered.length > 0) return true;
    return false;
  };

  const calcPrice = () => {
    let sum = 0;
    product.weightAndPrice.map((item, index) => {
      if (item) {
        sum += item.price * quantity[index];
      }
    });
    return sum;
  };

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
  }
  
  const handleOrderDialogClose = (event) => {
    setOrderDialog(false);
  }

	return (
    <>
      {isOrderDialog && (
        <OrderDialog
          isOpen={isOrderDialog}
          onClose={handleOrderDialogClose}
          setOrderShow={setOrderShow}
          orderDate={orderDate}
          orderTime={orderTime}
          orderType={orderType}
          setOrderDate={setOrderDate}
          setOrderTime={setOrderTime}
          setOrderType={setOrderType}
        />
      )}
      
      <Container maxWidth="xl">
        <Grid sx={{ flexDirection: 'row', justifyContent: 'space-between', m: 3, p: 3 }}>
          <Typography gutterBottom variant="h4" sx={{ width: 'auto' }}>
            {product && product.productName}
          </Typography>
          <ul>
          {dispensary && <li>
              <MBreadcrumbs
                sx={{ fontSize: '20px', mb: 3 }}
                links={[
                  { name: 'Dashboard', href: `${PATH_APP.general.root}` },
                  { name: 'Discover', href: `${PATH_APP.general.discover}` },
                  { name: `${dispensary.name}`, href: `${PATH_APP.root}/dispensaryDetail/${dispensary._id}`},
                  { name: `${category && category.name}/${product && product.productName}`, href: '#' },
                ]}
              />
            </li>}
            <li>
              <MBreadcrumbs
                sx={{ fontSize: '20px', mb: 3 }}
                links={[
                  { name: 'Dashboard', href: `${PATH_APP.general.root}` },
                  { name: 'Discover', href: `${PATH_APP.general.discover}` },
                  { name: `${category && category.name}`, href: `${PATH_APP.general.discover}/${category && category._id}` },
                  { name: `${product && product.productName}`, href: '#' }
                ]}
              />
            </li>
          </ul>
        </Grid>
        {product && category && !isOrderShow && (
          <Grid container>
            <Card className={classes.mainDetail} sx={{  }}>
              <Grid xs={12} md={7}>
                <Card sx={{ border: 'none', boxShadow: 'none' }}>
                  <ProductPhoto photos={product.photos} />
                </Card>
              </Grid>
              <Grid xs={12} md={5}>
                <Card sx={{ border: 'none', boxShadow: 'none', p: 3 }}>
                  <Typography gutterBottom variant="h6" sx={{ width: 'auto' }}>
                    {/* {product && product.productName} - {product && product.type >= 0 && types[product.category][product.type]} */}
                  </Typography>
                  <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledRating
                      defaultValue={4.8}
                      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      icon={<StarBorderOutlined fontSize="inherit" />}
                      className={classes.rating}
                      disabled
                      size='medium'
                    />
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => onHandleFavorite(product._id)}
                    >
                      <FavoriteIcon
                        sx={
                          checkIfFavorite(product._id)
                          ? { color: 'red', width: '50px', height: '50px' }
                          : { color: 'gray', width: '50px', height: '50px' }
                        }
                      />
                    </IconButton>
                  </Grid>
                  
                  <Typography gutterBottom variant="h6" sx={{ width: 'auto' }}>
                    ${calcPrice()}
                  </Typography>
                  <Grid fullWidth>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Weight</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.weightAndPrice.map((item, index) => {
                          if (item) return (
                            <TableRow key={index}>
                              <TableCell>{item.weight}</TableCell>
                              <TableCell>{item.price}</TableCell>
                              <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                <QuantityAndPrice idx={index} />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', mt: 2 }}>
                    <Button sx={{ width: '120px', backgroundColor: '#00ab55', color: 'white' }} >Add To Cart</Button>
                    <Button
                      onClick={() => {
                        if (calcPrice() > 0) setOrderDialog(true);
                      }}
                      sx={{ width: '120px', backgroundColor: '#00ab55', color: 'white' }}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Card>
              </Grid>
            </Card>
            
            <Card sx={{ p: 0, m: 0, width: '100%' }}>
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: 2, pb: 1 }}>
                <Button>Description</Button>
                <Button>Reviews</Button>
              </Grid>
              <Card sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, p: 2 }}>
                <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: 1 }}>
                  <Typography sx={{ width: '100px', textAlign: 'left' }}>Category:</Typography>
                  <Typography>
                    {category && category.name}
                  </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: 1 }}>
                  <Typography sx={{ width: '100px', textAlign: 'left' }}>Type:</Typography>
                  {/* <Typography>{product.type >=0 && types[product.category][product.type]}</Typography> */}
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: 1 }}>
                  <Typography sx={{ width: '100px', textAlign: 'left' }}>THC Level:</Typography>
                  <Typography>{product.thcLevel}</Typography>
                </Grid>
              </Card>
            </Card>
          </Grid>
        )}
        {product && category && isOrderShow && (
          <Grid container>
            <Checkout
              quantity={quantity}
              setQuantity={setQuantity}
              orderType={orderType}
              orderDate={orderDate}
              orderTime={orderTime}
              setOrderType={setOrderType}
              setOrderDate={setOrderDate}
              setOrderTime={setOrderTime}
              orderCancel={setOrderShow}
            />
          </Grid>
        )}
      </Container>
    </>
	);
}
