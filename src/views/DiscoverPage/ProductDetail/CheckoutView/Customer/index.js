import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import CameraIcon from '@material-ui/icons/CameraAlt';
import UploadIcon from '@material-ui/icons/Computer';
import { Button, Card, Typography, IconButton, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'src/redux/slices/user';

const useStyles = makeStyles((theme) => ({
    active: {
		backgroundColor: '#00AB55',
		color: 'white',
	},
	inActive: {
		backgroundColor: 'inherit',
	},
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
		height: '300px',
		width: '80vw',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		top: `calc(50vh - 125px)`,
		left: `10vw`,
		padding: 3,
		zIndex: 5,
		[theme.breakpoints.up('md')]:{
			left: `calc(50vw - 60px)`,
			width: '400px'
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

const CaptureCamera = ({ isOpen, onClose }) => {
	const ref = useRef();
	const classes = useStyles();

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
			if (ref && ref.current) {
				ref.current.srcObject = s;
				ref.current.play();
			}
		});
	}, [ref, isOpen]);

	return (
		<>
			{isOpen && (
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
						<video
							ref={ref}
							autoPlay
							style={{ width: '320px', height: '200px', marginTop: '50px', objectFit: 'cover' }}
						/>
						<Button>Record</Button>
					</Card>
				</>
			)}
		</>
	)
}

Customer.propTypes = {
	step: PropTypes.number,
	next: PropTypes.func,
	orderCancel: PropTypes.func,
	setCustomer: PropTypes.func,
	formData: PropTypes.any,
	// setOrderDateTime: PropTypes.func,
	// setOrderShow: PropTypes.func,
};

function Customer({ step, next, orderCancel, setCustomer, formData }) {
	const { myProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfile());
	}, []);

	const classes = useStyles();
	const [isOpen, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		phone: Yup.string().required('Phone Number is required'),
		email: Yup.string().required('Email is required'),
		address: Yup.string().required('Address is required'),
		license: Yup.mixed()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
			firstName: myProfile && myProfile.displayName.split(' ')[0],
			lastName: myProfile && myProfile.displayName.split(' ')[1],
			phone: myProfile && myProfile.phoneNumber,
			email: myProfile && myProfile.email,
			address: myProfile && myProfile.address,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
			setCustomer(values);
			next(step + 1);
    }
	});
	
	const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
		<FormikProvider value={formik}>
			<Form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Card sx={{ p: 3, mt: 5, zIndex: 10 }}>
					<Typography>
						Customer
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
						<TextField
							label="First Name"
							required
							sx={{ width: '45%' }}
							InputLabelProps={{ shrink: true }}
							{...getFieldProps('firstName')}
							error={Boolean(touched.firstName && errors.firstName)}
						/>
						<TextField
							label="Last Name"
							required
							sx={{ width: '45%' }}
							InputLabelProps={{ shrink: true }}
							{...getFieldProps('lastName')}
							error={Boolean(touched.lastName && errors.lastName)}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
						<TextField
							fullWidth
							label="Mobile Phone"
							InputLabelProps={{ shrink: true }}
							{...getFieldProps('phone')}
							error={Boolean(touched.phone && errors.phone)}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
						<TextField
							fullWidth
							label="Email"
							InputLabelProps={{ shrink: true }}
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
						<TextField
							fullWidth
							label="Address"
							InputLabelProps={{ shrink: true }}
							{...getFieldProps('address')}
							error={Boolean(touched.address && errors.address)}
						/>
					</Box>
					<Typography>
						Upload your drivers license or goverment issued ID
					</Typography>
					<Box sx={{ display: 'flex', flexDirection:{xs:'column', sm:'column', md:'row'},justifyContent: 'space-between', mt: 2, mb: 3 }}>
						<Button
							onClick={(e) => {
								e.preventDefault();
								setOpen(true)
							}}
							sx={{ width:{ xs:'100%', md:'45%'}, border: 'solid 2px #b9b7b7', height: '50px', justifyContent: 'left' }}
						>
							<CameraIcon sx={{ width: '40px', height: '40px' }}/>
							<Typography sx={{ width: 'calc(100% - 80px)' }}>Camera</Typography>
						</Button>
						
						<Button
							component="label"
							sx={{ width:{ xs:'100%', md:'45%'}, border: 'solid 2px #b9b7b7', height: '50px', justifyContent: 'left' }}
						>
							<UploadIcon sx={{ width: '40px', height: '40px' }}/>
							<Typography sx={{ width: 'calc(100% - 80px)', textAlign: 'center' }}>Upload</Typography>
							<input
								type='file'
								style={{ display: 'none' }}
								{...getFieldProps('license')}
								onChange={(e) => {
									console.log(e, e.target, e.target.value);
									formData.set(`image_license`, e.target.value);
								}}
								error={Boolean(touched.license && errors.license)}
							/>
						</Button>
					</Box>
					<Button type="submit" sx={{ float: 'right' }}>Save & Next</Button>
					<Button onClick={() => orderCancel(false)} sx={{ float: 'left' }}>Cancel</Button>
					<CaptureCamera
						isOpen={isOpen}
						onClose={handleClose}
					/>
				</Card>
			</Form>
		</FormikProvider>
	)
}

export default Customer;
