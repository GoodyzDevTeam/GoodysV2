import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Card, Typography, IconButton, Rating } from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    bottom: '0px',
    transition: theme.transitions.create('transform', {
      duration: 500
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
}));

DispensaryPickup.propTypes = {
	isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  dispensaries: PropTypes.array
};

function DispensaryPickup({ isOpen, onClose, dispensaries }) {
  const classes = useStyles();
  const [state, setState] = React.useState({ view: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const demoDispensary = [
    {
      id: 'Rebud',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      letter: 'R',
      rating: '4.8 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `For over six years we have been serving the medical marijuana needs of patients looking for a natural remedy to living their best life. Starting in January 2020, we serve everybody with our recreational license. We are committed to providing a world-class service no matter who you are and what your needs are.`
    },
    {
      id: 'Divine Wellness',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      letter: 'D',
      rating: '4.8 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Experience the legacy of Divine Wellness Center Since 2007. One of LA’s longest operating PRE-ICO medical and now recreational cannabis collective. Our mission at Divine Wellness is simple, to provide our members excellent service with knowledgeable staff ready to answer all your questions about your canna-needs & products with superlative quality! We can guarantee you our large selection is connoisseur crafted & curated often to assure you the freshest quality of product currently available. After all, variety is the spice of life!`
    },
    {
      id: 'Atrium',
      image1: `https://images.weedmaps.com/deliveries/000/071/276/avatar/original/1594022279-https---leafly-public.s3-us-west-2.amazonaws.com-dispensary-logos-JoOrFRTBTluhu7oUroLo_horz4.jpg?w=274&dpr=1&auto=format`,
      letter: 'A',
      rating: '4.7 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Welcome to Atrium–a new way to experience cannabis. Atrium proudly serves the Woodland Hills, Tarzana, and Canoga Park community with premium quality cannabis products at a competitive price. At Atrium, we strive to bring you the finest curation of products to enhance and improve your life, whether it be through an emotional, spiritual, or medical approach.`
    },
    {
      id: 'Elevate Delivery',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      letter: 'E',
      rating: '4.5 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Located in the middle of the bustling Woodlands Hills retail district, Elevate is as much part of its surrounding community as is the community we have developed inside. Come visit us and whether you are a seasoned cannabis connoisseur or just starting your exploration, you will find our knowledgeable staff waiting to assist you in finding what you need.We are a compassionate company, providing our community with safe access to cannabis products for healing and wellness.Our goal is to educate and provide an elevated experience for our customers and community. And with that to create a place where people feel safe and comfortable exploring the healing possibilities of this plant medicine with the guidance of knowledgeable professionals.`
    },
    {
      id: 'Rebud',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      letter: 'R',
      rating: '4.8 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `For over six years we have been serving the medical marijuana needs of patients looking for a natural remedy to living their best life. Starting in January 2020, we serve everybody with our recreational license. We are committed to providing a world-class service no matter who you are and what your needs are.`
    },
    {
      id: 'Divine Wellness',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      letter: 'D',
      rating: '4.8 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Experience the legacy of Divine Wellness Center Since 2007. One of LA’s longest operating PRE-ICO medical and now recreational cannabis collective. Our mission at Divine Wellness is simple, to provide our members excellent service with knowledgeable staff ready to answer all your questions about your canna-needs & products with superlative quality! We can guarantee you our large selection is connoisseur crafted & curated often to assure you the freshest quality of product currently available. After all, variety is the spice of life!`
    },
    {
      id: 'Atrium',
      image1: `https://images.weedmaps.com/deliveries/000/071/276/avatar/original/1594022279-https---leafly-public.s3-us-west-2.amazonaws.com-dispensary-logos-JoOrFRTBTluhu7oUroLo_horz4.jpg?w=274&dpr=1&auto=format`,
      letter: 'A',
      rating: '4.7 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Welcome to Atrium–a new way to experience cannabis. Atrium proudly serves the Woodland Hills, Tarzana, and Canoga Park community with premium quality cannabis products at a competitive price. At Atrium, we strive to bring you the finest curation of products to enhance and improve your life, whether it be through an emotional, spiritual, or medical approach.`
    },
    {
      id: 'Elevate Delivery',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      letter: 'E',
      rating: '4.5 stars',
      type: 'Medical & Recreational',
      status: 'Delivery Only',
      intro: `Located in the middle of the bustling Woodlands Hills retail district, Elevate is as much part of its surrounding community as is the community we have developed inside. Come visit us and whether you are a seasoned cannabis connoisseur or just starting your exploration, you will find our knowledgeable staff waiting to assist you in finding what you need.We are a compassionate company, providing our community with safe access to cannabis products for healing and wellness.Our goal is to educate and provide an elevated experience for our customers and community. And with that to create a place where people feel safe and comfortable exploring the healing possibilities of this plant medicine with the guidance of knowledgeable professionals.`
    }
  ];

  return (
    <Card
      sx={{
        position: 'absolute',
        height: '320px',
        bottom: '-320px',
        overflowY: 'scroll',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        pt: 3,
      }}
      className={isOpen && classes.expand}
    >
      <IconButton
        aria-label="add to favorites"
        sx={{ position: 'absolute', right: '0px', top: '0px' }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      {dispensaries && dispensaries.map((dispensary, index) => (
        <Grid key={index} xs={12} md={3} sx={{ pt: 3 }}>
          <Card sx={{ display: 'flex', flexDirection: 'row', m: 1, minHeight: '250px' }}>
            <Grid
              xs={6}
              md={6}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Grid xs={12} md={12}>
                <CardHeader
                  sx={{ display: 'flex', pt: 3, pl: 3, alignItems: 'flex-start' }}
                  avatar={
                    <Avatar aria-label="recipe" sx={{ backgroundColor: '#00AB55' }}>
                      {dispensary.name[0]}
                    </Avatar>
                  }
                  title={dispensary.name}
                  subheader={''}
                />
                <Typography sx={{ pl: 3 }}>
                  <Rating
                    defaultValue={dispensary.rating}
                    icon={<StarBorderOutlined fontSize="inherit" />}
                    disabled
                    size='small'
                  />
                  {dispensary.rating}
                </Typography>
                <Typography sx={{ pl: 3, fontSize: '12px' }}>{dispensary.type}</Typography>
                <Typography sx={{ pl: 3 }}>{dispensary.orderType}</Typography>
                <Typography sx={{ pl: 3, fontSize: '12px' }}>{dispensary.distance}km</Typography>
              </Grid>
              
              <Button variant="outlined" sx={{ width: '80px', mb: 1 }}>
                <RouterLink 
                  style={{ textDecoration: 'none' }}
                  to={`${PATH_APP.root}/dispensaryDetail/${dispensary._id}`}
                >
                  Visit
                </RouterLink>
              </Button>
            </Grid>
            
            <CardMedia
              image={dispensary.mainImage}
              title="Paella dish"
              sx={{ width: '300px' }}
            />
          </Card>
        </Grid>
      ))}
    </Card>
  );
}

export default DispensaryPickup;
