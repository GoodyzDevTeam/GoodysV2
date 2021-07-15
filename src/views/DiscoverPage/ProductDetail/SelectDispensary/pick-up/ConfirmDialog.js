
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addCart } from 'src/redux/slices/product';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  confirmDialog: {
    position: 'fixed',
    width: '100%',
    height: '200px',
    zIndex: 6,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '30px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '300px',
      left: 'calc(50vw - 10px)',
      top: 'calc(50vh - 150px)',
    }
  },
}));

// ----------------------------------------------------------------------

const ConfirmDialog = ({ product, quantity, dispensary, onAdded, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    let addingProduct = JSON.parse(JSON.stringify(product));
    addingProduct.quantity=[];
    console.log(addingProduct, quantity);
    addingProduct.weightAndPrice.map((wp, idx) => {
      if (wp) addingProduct.quantity[idx] = quantity[idx];
    });
    
    await dispatch(addCart({ addingProduct, dispensary }));
    onAdded();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <>
      <Box
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
      />
      <Card className={classes.confirmDialog}>
        <IconButton
          aria-label="add to favorites"
          sx={{ position: 'absolute', right: '0px', top: '0px' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Do you confirm to take <label style={{ color: 'green', marginRight: '5px' }}>{product.productName}</label>
           from <label style={{ color: 'green' }}>{dispensary.name}</label> ?
        </Typography>
        <Box>
          <Button variant="contained" onClick={onConfirm} sx={{ mr: 2 }}>
            Confirm
          </Button>
          <Button variant="contained" onClick={onCancel} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Card>
    </>
  )
};

export default ConfirmDialog;
