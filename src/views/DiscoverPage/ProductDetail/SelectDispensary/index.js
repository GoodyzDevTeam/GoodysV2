import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShopIcon from '@material-ui/icons/ShopTwoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Card, Typography, IconButton, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import { SettingsRemoteRounded } from '@material-ui/icons';
import PickUp from './pick-up/index';

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
	dispensary: PropTypes.any,
	product: PropTypes.any,
	quantity: PropTypes.any,
};

function SelectDispensary({
	isOpen,
	onClose,
	dispensary,
	product,
	quantity
}) {
	const classes = useStyles();

	const handleScrollList = (event) => {
		// console.log(event);
	};

	const handleConfirm = (event) => {
		onClose();
	}

	const isExist = !dispensary
		? false
		: dispensary.products.some((p) => p._id == product._id);
	console.log(dispensary, isExist);
  return (
		<>
			<Box className={classes.mask} onClick={onClose}></Box>
			<Card className={classes.dialog}>	
				<IconButton
					aria-label="add to favorites"
					sx={{ position: 'absolute', right: '0px', top: '0px' }}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				{isExist && (
					<Typography variant="h5" sx={{ display: 'flex', mt: 3 }}>
						You want it from
						<Typography variant="h5" sx={{ color: '#42966b', ml: 1, mr: 1 }}>{dispensary.name}</Typography>?
					</Typography>
				)}
				<Typography variant="h5" sx={{ color: '#42966b', ml: 1, mr: 1 }}>
					Select one near you.
				</Typography>
				<PickUp className="container" />
			</Card>
		</>
  );
}

export default SelectDispensary;
