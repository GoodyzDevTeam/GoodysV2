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
	Typography,
	Box
} from '@material-ui/core';
import { alpha, experimentalStyled as styled, makeStyles, withStyles } from '@material-ui/core/styles';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import EditAttributesOutlined from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import MinusIcon from '@material-ui/icons/Remove';
import PlusIcon from '@material-ui/icons/Add';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import Page from 'src/components/Page';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory, getProduct } from 'src/redux/slices/product';
import ProductPhoto from './ProductPhoto';

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
}))

const QuantityButton = styled(Button)(({ theme }) => ({
  width: '20px',
  maxWidth: '20px',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%'
}))

// ----------------------------------------------------------------------

export default function ProductPreview() {
	const classes = useStyles();
  const dispatch = useDispatch();
  const { product, category } = useSelector((state) => state.product);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  useEffect(() => {
    product && dispatch(getCategory(product.category));
  }, [product]);

	const QuantityAndPrice = () => {
		const [quantity, setQuantity] = useState(0);
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
				<QuantityButton onClick={() => setQuantity(Math.max(0, quantity - 1))} size="small" >
					<MinusIcon />
				</QuantityButton>
				<input
          type="number"
          disabled
          value={quantity}
          style={{
            border: 'none',
            width: '50px',
            textAlign: 'center',
            backgroundColor: 'white'
          }}
        />
				<QuantityButton onClick={() => setQuantity(quantity + 1)} size="small" >
					<PlusIcon />
				</QuantityButton>
				</Grid>
		);
	}

	return (
    <>
      {product && category && (
        <Container maxWidth="xl">
          <Grid sx={{ flexDirection: 'row', justifyContent: 'space-between', m: 3, p: 3 }}>
            <Typography gutterBottom variant="h4" sx={{ width: 'auto' }}>
              {product.productName}
            </Typography>
          </Grid>
          
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
                  <StyledRating
                    defaultValue={4.8}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    icon={<StarBorderOutlined fontSize="inherit" />}
                    className={classes.rating}
                    disabled
                    size='medium'
                  />
                  <Typography gutterBottom variant="h6" sx={{ width: 'auto' }}>
                    $ 45.00
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
                                <QuantityAndPrice />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button sx={{ width: '120px', backgroundColor: '#00ab55', color: 'white' }} >Add To Cart</Button>
                    <Button sx={{ width: '120px', backgroundColor: '#00ab55', color: 'white' }} >Buy Now</Button>
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
        </Container>
      )}
    </>
	);
}
