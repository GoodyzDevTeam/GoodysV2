/* eslint-disable */
import clsx from 'clsx';
import faker from 'faker';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import { getImgFeed } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import {
  CarouselArrowsBasic1,
  CarouselCustomPaging1
} from 'src/components/Carousel';
import {
  varFadeInLeft,
  varFadeInRight,
  MotionContainer
} from 'src/components/Animate';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { CardContent, Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { image, title, description } = item;
  const isRTL = theme.direction === 'rtl';
  const setAnimate = isRTL ? varFadeInLeft : varFadeInRight;

  return (
    <RouterLink to="#">
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
          }}
        />
        <Box
          component="img"
          alt={title}
          src="/static/images/placeholder.svg"
          srcSet={`${image.small} 600w, ${image.medium} 960w`}
          sx={{
            width: '100%',
            objectFit: 'cover',
            height: { xs: 280, xl: 320 }
          }}
        />
      </Box>
    </RouterLink>
  );
}

DispensaryPhoto.propTypes = {
	className: PropTypes.string,
	photos: PropTypes.array
};

function DispensaryPhoto({ className, photos, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0
	);
	
	const CAROUSELS = photos.map((item, index) => {
		const setIndex = index + 3;
	
		return {
			image: {
				small: item,
				medium: item
			}
		};
	});

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselCustomPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto !important',
        right: 'auto !important'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Slider ref={carouselRef} {...settings}>
        {CAROUSELS.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            isActive={index === currentIndex}
          />
        ))}
      </Slider>
      <CarouselArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}

export default DispensaryPhoto;
