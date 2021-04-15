import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { PATH_APP } from 'src/routes/paths';
import { BASE_IMG } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import useBreakpoints from 'src/hooks/useBreakpoints';
import {
  varFadeInUp,
  MotionInView,
  varFadeInRight
} from 'src/components/Animate';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Box, Grid, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  const isLTR = theme.direction === 'ltr';

  return {
    root: {
      padding: theme.spacing(15, 0),
      marginTop: theme.spacing(-15),
      backgroundImage:
        theme.palette.mode === 'light'
          ? `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 0%, ${
              theme.palette.grey[300]
            } 100%)`
          : 'none',
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(0)
      }
    },
    content: {
      maxWidth: 520,
      margin: 'auto',
      textAlign: 'center',
      marginBottom: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        height: '100%',
        marginBottom: 0,
        textAlign: 'left',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: theme.spacing(5)
      }
    },
    screen: {
      bottom: 0,
      maxWidth: 460,
      position: 'absolute'
    },
    screenLeft: { zIndex: 3 },
    screenRight: { zIndex: 1 },
    screenCenter: {
      position: 'relative',
      zIndex: 2,
      bottom: 20,
      transform: isLTR ? 'translateX(-24%)' : 'translateX(24%)',
      [theme.breakpoints.up('sm')]: {
        bottom: 40,
        transform: isLTR ? 'translateX(-32%)' : 'translateX(32%)'
      }
    },
    lazyload: {
      marginLeft: theme.spacing(-5),
      marginTop: theme.spacing(-8),
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(0)
      }
    },
    img: {
      borderRadius: theme.spacing(2)
    }
  };
});

const variantScreenLeftMoblie = {
  initial: { x: '22%', y: -10, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenRightMobile = {
  initial: { x: '26%', y: -30, opacity: 0 },
  animate: { x: '48%', y: -40, opacity: 1 }
};
const variantScreenLeft = {
  initial: { x: '30%', y: -30, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenCenter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
const variantScreenRight = {
  initial: { x: '34%', y: -50, opacity: 0 },
  animate: { x: '64%', y: -80, opacity: 1 }
};
const transition = { duration: 0.5, ease: 'easeOut' };

// ----------------------------------------------------------------------

LandingPageLearn.propTypes = {
  className: PropTypes.string
};

function LandingPageLearn({ className }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useBreakpoints('up', 'sm');
  const upMd = useBreakpoints('up', 'md');
  const textAnimate = upMd ? varFadeInRight : varFadeInUp;

  // const getImg = (width, index) =>
  //   `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/screen_${
  //     theme.palette.mode === 'light' ? 'light' : 'dark'
  //   }_${index + 1}.png`;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} lg={5}>
            <div className={classes.content}>
              <MotionInView variants={textAnimate}>
                <Typography variant="h2" paragraph>
                  Learn
                </Typography>
              </MotionInView>

              <MotionInView variants={textAnimate}>
                <Typography sx={{ color: 'text.secondary' }}>
                  Educate yourself on different cannabis products, topics and
                  laws.
                </Typography>
              </MotionInView>

              <MotionInView variants={textAnimate} sx={{ mt: 5 }}>
                <Button
                  size="large"
                  color="inherit"
                  variant="outlined"
                  component={RouterLink}
                  to={PATH_APP.general.learn}
                >
                  View All
                </Button>
              </MotionInView>
            </div>
          </Grid>

          <Grid
            dir="rtl"
            item
            xs={12}
            md={8}
            lg={7}
            sx={{
              position: 'relative',
              pl: { sm: '16% !important', md: '0 !important' }
            }}
            className={classes.lazyload}
          >
            <Box
              component="img"
              alt="friends enjoying cannabis"
              src="https://weedmaps.com/learn/wp-content/uploads/2020/10/CRTV-3440_May-Social-Ask0121-scaled.jpg"
              variants={varFadeInUp}
              sx={{ width: { xs: '80%', sm: '100%' } }}
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingPageLearn;
