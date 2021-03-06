import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShopIcon from '@material-ui/icons/ShopTwoOutlined';
import TimeIcon from '@material-ui/icons/AccessTime';
import { Button, Card, Typography, IconButton, TextField, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  option: {
		padding: '10px',
		marginLeft: '20px',
		marginRight: '20px',
		marginTop: '3px',
		marginBottom: '3px',
		cursor: 'pointer',
		borderRadius: '10px',
		zIndex: 100,
		"&:hover": {
			background: '#00ab55',
		},
	}
}));

TypeAndOrder.propTypes = {
	step: PropTypes.number,
	next: PropTypes.func,
	orderType: PropTypes.any,
	setOrderType: PropTypes.func,
	orderDate: PropTypes.any,
	setOrderDate: PropTypes.func,
	orderTime: PropTypes.any,
	setOrderTime: PropTypes.func,
};

function TypeAndOrder({
	step,
	next,
	orderType,
	setOrderType,
	orderDate,
	setOrderDate,
	orderTime,
	setOrderTime
}) {
	const classes = useStyles();
	let times = [];

	for (let i = 10; i < 24; i++ ) {
		times.push(`${i}:00:00 - ${i + 1}:00:00`);
	}

  return (
		<Card sx={{ p: 3, mt: 5, zIndex: 10 }}>
			<Typography>
				Type & Order
			</Typography>
			
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 3 }}>
				<TextField
					select
					fullWidth
					label="Type"
					value={orderType}
					onChange={(event) => setOrderType(event.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					error={false}
					InputProps={{
						startAdornment: (
							<ShopIcon sx={{ width: '30px', height: '30px', mr: 3}} />
						),
					}}
					sx={{ cursor: 'pointer', zIndex: 100 }}
				>
					<option key={0} value="pickup" className={classes.option}>
						Pick Up
					</option>
					<option key={1} value="delivery" className={classes.option}>
						Delivery
					</option>
				</TextField>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
				<TextField
					select
					fullWidth
					label="Time"
					value={orderTime}
					onChange={(event) => setOrderTime(event.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					error={false}
					InputProps={{
						startAdornment: (
							<TimeIcon sx={{ width: '30px', height: '30px', mr: 3}} />
						),
					}}
					sx={{ cursor: 'pointer' }}
				>
					{times.map((time, idx) => (
						<option key={idx} value={time} className={classes.option}>
							{time}
						</option>
					))}
				</TextField>
			</Box>

			<Button onClick={() => next(step + 1)} sx={{ float: 'right' }}>Save & Next</Button>
			<Button onClick={() => next(step - 1)} sx={{ float: 'left' }}>Back</Button>
		</Card>
	)
}

export default TypeAndOrder;
