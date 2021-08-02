import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Card, Typography, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	mask: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'gray',
		opacity: '0.5',
		zIndex: 3,
	},
	dialog: {
		position: 'fixed',
		height: '100px',
		width: '300px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		top: `calc(50vh - 125px)`,
		left: `0px`,
		padding: 3,
		zIndex: 4,
		[theme.breakpoints.up('sm')]:{
			left: `calc(50vw - 150px)`,
			width: '300px'
		},
		[theme.breakpoints.up('md')]:{
			left: `calc(50vw - 150px)`,
			width: '300px'
		},
		[theme.breakpoints.up('lg')]:{
			left: `calc(50vw - 150px)`,
			width: '300px'
		},
	},
}));

const SignInAdviceDialog = ({ onClose }) => {
	const classes = useStyles();

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
				<Grid sx={{ pt: 5 }}>
					<Typography>
						Please Sign in and try again.
					</Typography>
				</Grid>
			</Card>
		</>
  )
};

export default SignInAdviceDialog;