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
import { getCategories, getProducts, toggleFavoriteProduct } from 'src/redux/slices/product';
import { getDispensary, toggleFavoriteDispensary } from 'src/redux/slices/dispensary';
import DispensaryPhoto from './DispensaryPhoto';
import { PATH_APP, PATH_DISCOVER } from 'src/routes/paths';
import ProductsInDispensary from './ProductsInDispensary';

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
	},
	detailContainer: {
		p: 0, pb: 3, m: 0, display: 'flex', flexDirection: 'column', width: '100%',
		[theme.breakpoints.up('md')]:{
			paddingLeft: '100px',
			paddingRight: '100px',
		}
	},
	boxShadow: {
		boxShadow: `0 0 2px 0 rgb(145 158 171 / 70%), 0 2px 9px -4px rgb(145 158 171 / 24%)`,
	},
	active: {
		background: 'green',
		color: 'white',
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
	const { favoriteProducts, categories } = useSelector((state) => state.product);
	const { dispensary, favoriteDispensaries } = useSelector((state) => state.dispensary);
	const { dispensaryId } = useParams();
	const [curCategory, setCurCategory] = useState(null);

  useEffect(() => {
		dispatch(getDispensary(dispensaryId));
		dispatch(getCategories());
	}, [dispatch]);
	
	useEffect(() => {
		if (!curCategory && categories)
			setCurCategory(categories[0]);
	}, [categories]);

  const onHandleFavoriteProduct = (id) => {
    dispatch(toggleFavoriteProduct(id));
	}
	
	const onHandleFavorite = (id) => {
    dispatch(toggleFavoriteDispensary(id));
  }

  const checkIfFavoriteProduct = (id) => {
    if (!favoriteProducts) return false;
    let filtered = favoriteProducts.filter((item) => item.product._id == id);
    if (filtered.length > 0) return true;
    return false;
  };

	const checkIfFavorite = (id) => {
    if (!favoriteDispensaries) return false;
    let filtered = favoriteDispensaries.filter((item) => item.dispensary._id == id);
    if (filtered.length > 0) return true;
    return false;
	};

	const openStatus = () => {
		const curTime = new Date();
		if (curTime.getHours() < dispensary.openFrom)
			return `Still Closed, Will Open from ${dispensary.openFrom}`;
		else if (curTime.getHours() > dispensary.openTo)
			return `Closed, Open Until ${dispensary.openTo}`;
		
		return `Open Until ${dispensary.openTo}`;
	};
	
	return (
    <>
    	{dispensary && (
			<Container maxWidth="xl">
				<Grid sx={{ flexDirection: 'row', justifyContent: 'space-between', p: 3 }}>
					<Typography gutterBottom variant="h4" sx={{ width: 'auto' }}>
						{dispensary.name}
					</Typography>
					<MBreadcrumbs
						sx={{ fontSize: '20px', m: 1 }}
						links={[
							{ name: 'Home', href: `${PATH_APP.general.root}` },
							{ name: 'Discover', href: `${PATH_APP.general.discover}` },
							{ name: `${dispensary.name}`, href: '#' }
						]}
					/>
				</Grid>
				<Grid container>
					<Card className={classes.mainDetail} sx={{  }}>
						<Grid xs={12} md={12}>
							<Card className={classes.boxShadow}>
								<DispensaryPhoto photos={[dispensary.mainImage]} />
							</Card>
							<Grid className={classes.detailContainer}>
								<Card sx={{display:'flex', alignItems: 'center', border: 'none', boxShadow: 'none', p: 3 }}>
									<StyledRating
										defaultValue={4.8}
										getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
										icon={<StarBorderOutlined fontSize="large" />}
										className={classes.rating}
										disabled
										size='medium'
									/>
									<IconButton
										aria-label="add to favorites"
										onClick={() => onHandleFavorite(dispensary._id)}
									>
										<FavoriteIcon
											sx={
												checkIfFavorite(dispensary._id)
													? { color: 'red', width: '28px', height: '28px' }
													: { color: 'gray', width: '28px', height: '28px' }
											}
										/>
									</IconButton>
								</Card>
								<Card sx={{ border: 'none', boxShadow: 'none', p: 3, pt: 0 }}>
									<Typography gutterBottom variant="h4" sx={{ width: 'auto' }}>
										{dispensary.address} {dispensary.city}, {dispensary.state}
									</Typography>
								</Card>
								<Grid
									sx={{ display: 'flex', flexDirection:{ xs: 'column', md: 'row'}, justifyContent: 'space-between', p: 3 }}
								>
									<Grid sx={6} md={6}>
										<Card sx={{ border: 'none', boxShadow: 'none', p: 0, pt: 0 }}>
											<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
												{dispensary.status}
											</Typography>
											<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
												{dispensary.type}
											</Typography>
											<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
												{dispensary.orderType}
											</Typography>
											<Typography
												gutterBottom
												variant="h5"
												sx={{ width: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
											>
												Phone Number: 
											{/* Phone Number: 
												Phone Number:  */}
												{dispensary.phone && dispensary.phone.map((item, idx) => (
													<Typography sx={{ fontStyle: 'italic', p: 1 }}>
														{item}{idx < dispensary.phone.length - 1 ? ", " : ""}
													</Typography>
												))}
											</Typography>
											<Typography
												gutterBottom
												variant="h5"
												sx={{ width: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
											>
												{/* Email: 
											Email:  */}
												Email: 
												{dispensary.email && dispensary.email.map((item, idx) => (
													<Typography sx={{ fontStyle: 'italic', p: 1 }}>
														{item}{idx < dispensary.email.length - 1 ? ", " : ""}
													</Typography>
												))}
											</Typography>
										</Card>
									</Grid>
									<Grid sx={6} md={6}>
										<Card sx={{ border: 'none', boxShadow: 'none', p: 0, pt: 0 }}>
											<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
												{openStatus()}
											</Typography>
											<Card sx={{ p: 2, mt: 1 }} className={classes.boxShadow}>
												<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
													License Imformation
												</Typography>
											</Card>
											<Card sx={{ p: 2, mt: 1 }} className={classes.boxShadow}>
												<Typography gutterBottom variant="h5" sx={{ width: 'auto' }}>
													Directions
												</Typography>
											</Card>
										</Card>
									</Grid>
								</Grid>
								<Grid
									sx={{ display: 'flex', flexDirection: 'column', p: 3 }}
								>
									<Card className={classes.boxShadow} sx={{ p: 3 }}>
										<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
											{curCategory && categories && categories.map((category, idx) => (
												<Button
													sx={{
														fontSize: { xs:'10px', md:'15px'},
														border: 'solid thin #00AB55',
														width: { xs:'80px', md:'120px' },
														m: 1,
													}}
													className={curCategory._id == category._id ? classes.active : ''}
													onClick={() => setCurCategory(category)}
												>
													{category.name}
												</Button>
											))}
										</Box>
										<ProductsInDispensary category={curCategory} products={dispensary.products} />
									</Card>
								</Grid>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Container>
    	)}
    </>
	);
}
