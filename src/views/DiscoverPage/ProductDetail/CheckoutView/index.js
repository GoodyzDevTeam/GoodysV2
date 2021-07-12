// import Cart from './Cart';
import Customer from './Customer';
import TypeAndOrder from './TypeAndOrder';
import Items from './Items';
import Summary from './Summary';
import Payment from './Payment';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import React, { useEffect, useState } from 'react';
import OrderComplete from './OrderComplete';
import { PATH_APP } from 'src/routes/paths';
import BillingAddress from './BillingAddress';
import { useHistory } from 'react-router-dom';
import { HeaderDashboard } from 'src/layouts/Common';
import { useDispatch, useSelector } from 'react-redux';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import {
  getCart,
  resetCart,
  onGotoStep,
  deleteCart,
  onBackStep,
  onNextStep,
  applyDiscount,
  applyShipping,
  createBilling,
  increaseQuantity,
  decreaseQuantity
} from 'src/redux/slices/product';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector
} from '@material-ui/core';

// ----------------------------------------------------------------------

const STEPS = ['Customer', 'Type & Time', 'Payment', 'Items'];

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

function Checkout({
  quantity,
  setQuantity,
  orderType,
  orderDate,
  orderTime,
  setOrderType,
  setOrderTime,
  setOrderDate,
  orderCancel,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { checkout, product } = useSelector((state) => state.product);
  const { dispensary } = useSelector((state) => state.dispensary);
  const {
    cart,
    total,
    billing,
    discount,
    subtotal,
    shipping,
  } = checkout;
  const [activeStep, setActiveStep] = useState(0);

  const isComplete = activeStep === STEPS.length;
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    product.weightAndPrice.map((item, index) => {
      if (item) {
        sum += item.price * quantity[index];
      }
    })
    setSubTotal(sum);
  }, [quantity]);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleResetStep = () => {
    // dispatch(resetCart());
    // history.push(PATH_APP.management.eCommerce.products);
    orderCancel(false);
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  const renderContent = () => {
    if (activeStep === 0) {
      return (
        <Customer step={0} next={setActiveStep} orderCancel={orderCancel}/>
      );
    }
    if (activeStep === 1) {
      return (
        <TypeAndOrder
          step={1}
          next={setActiveStep}
          orderType={orderType}
          orderDate={orderDate}
          orderTime={orderTime}
          setOrderType={setOrderType}
          setOrderDate={setOrderDate}
          setOrderTime={setOrderTime}
        />
      );
    }
    // if (activeStep === 1) {
    //   return (
    //     <BillingAddress
    //       cart={cart}
    //       total={total}
    //       subtotal={subtotal}
    //       discount={discount}
    //       onBackStep={handleBackStep}
    //       onNextStep={handleNextStep}
    //       onCreateBilling={handleCreateBilling}
    //     />
    //   );
    // }
    if (activeStep === 2) {
      return (
        <Payment
          total={total}
          billing={billing}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          step={2}
          next={setActiveStep}
          setDeliveryFee={setDeliveryFee}
          onComplete={handleNextStep}
          onGotoStep={handleGotoStep}
          onApplyShipping={handleApplyShipping}
        />
      );
    }
    if (activeStep === 3) {
      return (
        <Items
          step={3}
          next={setActiveStep}
          product={product}
          dispensary={dispensary}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      );
    }
    return;
  };

  return (
    <Grid
      title="Checkout-Ecommerce-Management | Minimal-UI"
      xs={12} md={12}
    >
      <Container>

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ p: 3, zIndex: 2 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    classes={{ label: classes.label }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {isComplete ? (
              <OrderComplete isComplete={isComplete} onReset={handleResetStep} />
            ) : (
              renderContent()
            )}
          </Grid>
          {!isComplete && 
            <Grid item xs={12} md={4} sx={{ p: 3 }}>
              <Summary total={subTotal + deliveryFee} subtotal={subTotal + deliveryFee}/>
            </Grid>
          }
        </Grid>
      </Container>
    </Grid>
  );
}

export default Checkout;