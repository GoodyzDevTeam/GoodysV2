import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Card, Typography, IconButton, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import { SettingsRemoteRounded } from '@material-ui/icons';
import PickUp from './pick-up/index';
import ConfirmDialog from './pick-up/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  active: {
		backgroundColor: '#00AB55',
		color: 'white',
	},
	inActive: {
		backgroundColor: 'inherit',
	},
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'gray',
		opacity: '0.5',
		zIndex: 3,
	},
	dialog: {
		position: 'absolute',
		height: '300px',
		width: '80vw',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		top: `calc(50vh - 125px)`,
		left: `5vw`,
		padding: '30px',
		zIndex: 4,
		[theme.breakpoints.up('md')]: {
			left: `calc(5vw + 266px)`,
			top: `calc(50vh - 350px)`,
			height: '700px',
			width: 'calc(90vw - 252px)'
		},
	},
  expandOpen: {
    transform: 'rotate(180deg)'
  },
}));

const dateFormat = (date) => {
	let split = date.split('-');
	if (split[1].length == 1) split[1] = `0${split[1]}`;
	if (split[2].length == 1) split[2] = `0${split[2]}`;
	return `${split[0]}-${split[1]}-${split[2]}`;
};

const activeClassName = (time, orderTime) => {
	if (orderTime == time) return 'active';
	return 'inActive';
};

SelectDispensary.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	product: PropTypes.any,
	quantity: PropTypes.any,
	type: PropTypes.any,
};

function SelectDispensary({
	isOpen,
	onClose,
	product,
	quantity,
	type,
}) {
	const classes = useStyles();
	const [dispensary, setDispensary] = useState({});
	const [isConfirmDialog, setConfirmDialog] = useState(false);

	useEffect(() => {
		return () => {
			setDispensary();
		}
  }, []);

	const handleScrollList = (event) => {
		// console.log(event);
	};

  const onConfirmDialogShow = (_dispensary) => {
		setDispensary(_dispensary);
    setConfirmDialog(true);
  };

  const onCloseConfirmDialg = (event) => {
    setConfirmDialog(false);
	};

  return (
		<>
			{isConfirmDialog &&
				<ConfirmDialog
					product={product}
					quantity={quantity}
					dispensary={dispensary}
					onAdded={onClose}
					onClose={onCloseConfirmDialg}
					type={type}
				/>
			}
			<Box className={classes.mask} onClick={onClose}></Box>
			<Card className={classes.dialog}>	
				<IconButton
					aria-label="add to favorites"
					sx={{ position: 'absolute', right: '0px', top: '0px' }}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				<Typography variant="h5" sx={{ color: '#42966b', ml: 1, mr: 1 }}>
					You should select one dispensary to buy this product.
				</Typography>
				<PickUp
					product={product}
					className="container"
					onConfirm={onConfirmDialogShow}
				/>
			</Card>
		</>
  );
}

export default SelectDispensary;
