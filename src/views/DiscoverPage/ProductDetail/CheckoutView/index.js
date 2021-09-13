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
  addOrder,
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
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// ----------------------------------------------------------------------

const STEPS = ['Customer', 'Type & Time', 'Items', 'Payment'];

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
  orderProducts,
  orderDispensary,
  quantity,
  setQuantity,
  orderType,
  orderDate,
  orderTime,
  setOrderType,
  setOrderTime,
  setOrderDate,
  orderSuccess = () => {},
  orderCancel,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { checkout } = useSelector((state) => state.product);
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

  const [customer, setCustomer] = useState();
  const [payment, setPayment] = useState();
	const [formData, setFormData] = useState(new FormData(this));

  useEffect(() => {
    return () => {
      setCustomer();
      setPayment();
      setFormData();
    }
  }, []);

  useEffect(() => {
    let sum = 0;
    orderProducts.map((product, idx) => {
      product.weightAndPrice.map((item, index) => {
        if (item) {
          sum += item.price * quantity[idx][index];
        }
      })});
    setSubTotal(sum);
  }, [quantity]);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    const todo = async () => {
      if (isComplete) {
        // console.log('order complete, ', customer, payment, orderType, orderDate, orderTime, orderProducts, quantity, dispensary);
        console.log(payment);
        return;
        let dispensaryId;
        if (orderDispensary) {
          dispensaryId = orderDispensary._id;
        } else if (dispensary) {
          dispensaryId = dispensary._id;
        }
        let order = {
          merchantId: orderProducts[0].merchant,
          customerId: customer?._id,
          anonymous: JSON.stringify(customer),
          dispensaryId: dispensaryId,
          requestedTime: `${orderDate} ${orderTime.split(' - ')[0]}`,
          orderType,
          quantity: JSON.stringify(quantity),
          products: JSON.stringify(orderProducts)
        };
        console.log('here order: ', order);
        for (let key in order) {
          formData.append(key, order[key]);
        }
  
        await dispatch(addOrder(formData));
        setFormData(new FormData(this));
  
        orderSuccess(orderProducts);
      }
    };

    todo();
    
  }, [isComplete]);

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
        <Customer step={0} next={setActiveStep} orderCancel={orderCancel} setCustomer={setCustomer} formData={formData} />
      );
    }
    if (activeStep === 1) {
      if (orderType) {
        // setActiveStep(2);
        // return (<></>);
      }
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
        <Items
          step={2}
          next={setActiveStep}
          orderProducts={orderProducts}
          dispensary={dispensary}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      );
    }
    if (activeStep === 3) {
      return (
         <Payment
          total={total}
          billing={billing}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          step={3}
          next={setActiveStep}
          setDeliveryFee={setDeliveryFee}
          onComplete={handleNextStep}
          onGotoStep={handleGotoStep}
          onApplyShipping={handleApplyShipping}
          orderType={orderType}
          setPayment={setPayment}
        />
      );
    }
    return;
  };

  return (
    <Elements stripe={stripePromise}>
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
    </Elements>
  );
}

export default Checkout;
