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
import { ReactComponent as CarIcon } from './delivery.svg';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Card, Typography, IconButton, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import { SettingsRemoteRounded } from '@material-ui/icons';

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
		left: `calc(50vw - 150px)`,
		padding: 3,
		zIndex: 4,
		[theme.breakpoints.up('md')]:{
			left: `calc(50vw - 130px)`,
			width: '500px'
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

OrderDialog.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	setOrderShow: PropTypes.func,
	orderType: PropTypes.any,
	setOrderType: PropTypes.func,
	orderTime: PropTypes.any,
	setOrderTime: PropTypes.func,
	orderDate: PropTypes.any,
	setOrderDate: PropTypes.func,
};

function OrderDialog({
	setOrderShow,
	isOpen,
	orderType,
	setOrderType,
	orderTime,
	setOrderTime,
	orderDate,
	setOrderDate,
	onClose
}) {
	const classes = useStyles();
	const [step, setStep] = useState(0);
	const today = dateFormat(`${(new Date()).getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
	const [errorString, setErr] = useState('');
	const curTime = new Date().getHours();

	const handleScrollList = (event) => {
		// console.log(event);
	};
	
	const TimeList = ({ date }) => {
		const timeArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		let canStartTime = 10;
		if (date && Number(date.split('-')[2]) == new Date().getDate()) {
			canStartTime = new Date().getHours() + 1;
		} else if (date && Number(date.split('-')[2]) < new Date().getDate()) {
			canStartTime = 25;
		}

		useEffect(() => {
			
		});

		return (
			<List>
				{timeArr.map((item, idx) => {
					if (item >= canStartTime)
						return (
							<>
								<ListItem key={`${idx}-0`}>
									<Button
										fullWidth
										className={classes[activeClassName(`${item}:00:00 - ${item + 1}:00:00`, orderTime)]}
										onClick={() => {
											setErr('');
											setOrderTime(`${item}:00:00 - ${item + 1}:00:00`);
										}}
									>
										{item}: 00 : 00 - {item + 1}: 00 : 00
									</Button>
								</ListItem>
							</>
						);
					else return (<></>);
				})}
			</List>
		)
	};

	const handleDateChange = (event) => {
		console.log(event.target.value);
		setOrderDate(event.target.value);
	}

	const handleConfirm = (event) => {
		if (orderTime == '') {
			setErr('select order time');
			return;
		}
		setOrderShow(true);
		onClose();
		setStep(0);
	}

  return (
		<>
			<Box className={classes.mask} onClick={onClose}></Box>
			<Card className={classes.dialog} style={{ height: step == 1 ? 'auto' : '300px' }}>	
				<IconButton
					aria-label="add to favorites"
					sx={{ position: 'absolute', right: '0px', top: '0px' }}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				{step == 0 && (
					<>
						<Typography sx={{ pt: 2 }}>SELECT AN ORDER TYPE</Typography>
						<Box
							sx={{
								width: '80%',
								m: 3,
								mb: 0,
								display: 'flex', flexDirection: 'row',
								border: 'solid 3px #b9b7b7',
								borderRadius: '8px',
							}
						}>
							<Grid xs={2} sx={{ borderRight: 'solid 3px #b9b7b7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<ShopIcon sx={{ width: '40px', height: '40px' }}/>
							</Grid>
							<Grid xs={10}>
								<Button
									onClick={() => {
										setOrderType('pickup');
										setStep(1);
									}}
									sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}
								>
									<Typography>
										Pickup<br />
										No fee & No minimum
									</Typography>
								</Button>
							</Grid>
						</Box>
						<Box
							sx={{
								width: '80%',
								m: 3,
								mb: 0,
								display: 'flex', flexDirection: 'row',
								border: 'solid 3px #b9b7b7',
								borderRadius: '8px',
							}
						}>
							<Grid xs={2} sx={{ borderRight: 'solid 3px #b9b7b7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<CarIcon sx={{ width: '40px', height: '40px' }}/>
							</Grid>
							<Grid xs={10}>
								<Button
									// disabled
									onClick={() => {
										setOrderType('delivery');
										setStep(1);
									}}
									sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}
								>
									<Typography>
										{/* Delivery<br />
										Not Available */}
										Delivery
									</Typography>
								</Button>
							</Grid>
						</Box>
					</>
				)}
				{step == 1 && (
					<>
						<Typography sx={{ pt: 2 }}>SELECT A TIME</Typography>
						{errorString.length > 0 && (
							<Typography sx={{ pt: 2, color: 'red' }}>{errorString}</Typography>
						)}
						<Button
							onClick={() => {
								setErr('');
								setOrderTime(`${curTime}:00:00 - ${curTime + 1}:00:00`);
							}}
							sx={{
								width: '80%',
								m: 3,
								mb: 0,
								display: 'flex', flexDirection: 'row',
								border: 'solid 3px #b9b7b7',
								borderRadius: '8px',
							}}
							className={classes[activeClassName(`${curTime}:00:00 - ${curTime + 1}:00:00`, orderTime)]}
							disabled={orderDate != today}
						>
							ASAP
						</Button>
						<Typography>or</Typography>
						<Box
							sx={{
								width: '80%',
								m: 3,
								mb: 0,
								mt: 0,
								display: 'flex', flexDirection: 'row',
								border: 'solid 3px #b9b7b7',
								borderRadius: '8px',
							}
						}>
							<Grid xs={3} sx={{ borderRight: 'solid 3px #b9b7b7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								Schedule
							</Grid>
							<Grid xs={9} sx={{ p: 1 }}>
								<TextField
									fullWidth
									type="date"
									defaultValue={today}
									onChange={handleDateChange}
								/>
								<Box
									onScroll={handleScrollList}
									sx={{ maxHeight: '150px', overflowY: 'scroll' }}
								>
									<TimeList date={orderDate}/>
								</Box>
							</Grid>
							
						</Box>
						<Box sx={{ m: 2 }}>
							<Button onClick={() => setStep(0)}>
								Back
							</Button>
							<Button onClick={handleConfirm}>
								Confirm
							</Button>
						</Box>
					</>
				)}
				
			</Card>
		</>
  );
}

export default OrderDialog;
