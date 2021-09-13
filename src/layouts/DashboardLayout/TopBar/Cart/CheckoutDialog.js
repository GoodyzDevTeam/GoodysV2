
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addCart } from 'src/redux/slices/product';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Checkout from 'src/views/DiscoverPage/ProductDetail/CheckoutView';

// ----------------------------------------------------------------------
const dateFormat = (date) => {
	let split = date.split('-');
	if (split[1].length == 1) split[1] = `0${split[1]}`;
	if (split[2].length == 1) split[2] = `0${split[2]}`;
	return `${split[0]}-${split[1]}-${split[2]}`;
};

const useStyles = makeStyles((theme) => ({
  CheckoutDialog: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '30px',
    textAlign: 'center',
  },
}));

// ----------------------------------------------------------------------

const CheckoutDialog = ({ products, orderDispensary, onSuccess, onClose }) => {
  const classes = useStyles();
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(products.map((product) => product.quantity));
	const [orderType, setOrderType] = useState('pickup');
	const today = dateFormat(`${(new Date()).getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
	const [orderDate, setOrderDate] = useState(today);
  const [orderTime, setOrderTime] = useState('10:00:00 - 11:00:00');
  
  useEffect(() => {
    setOrderType('pickup');
    setOrderTime('10:00:00 - 11:00:00');

    return () => {
      setQuantity();
      setOrderType();
      setOrderTime();
    }
  }, []);

  return (
    <>
      {/* <Box
        onClick={onClose}
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
      /> */}
      <Card className={classes.CheckoutDialog}>
        <Checkout
					orderProducts={products}
          orderDispensary={orderDispensary}
					quantity={quantity}
					setQuantity={setQuantity}
					orderType={orderType ? orderType : 'pickup'}
					orderDate={orderDate}
					orderTime={orderTime ? orderTime : '10:00:00 - 11:00:00'}
					setOrderType={setOrderType}
					setOrderDate={setOrderDate}
					setOrderTime={setOrderTime}
					orderSuccess={onSuccess}
					orderCancel={onClose}
				/>
      </Card>
    </>
  )
};

export default CheckoutDialog;
