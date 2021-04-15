import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(45),
    padding: theme.spacing(3.5),
    margin: theme.spacing(1),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: theme.spacing(28),
      height: theme.spacing(40),
      padding: theme.spacing(0)
    }
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      width: '100%',
      height: theme.spacing(10),
      marginTop: theme.spacing(1),
      paddingTop: 0
    }
  },
  avatar: {
    backgroundColor: '#00AB55'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  HeaderBtn: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(10)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(15)
    },
    //large desktop
    ['@media (min-width: 1524px)']: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(3),
      width: theme.spacing(20)
    }
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentContainer: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      margin: theme.spacing(1)
    }
  },
  actions: {
    marginTop: theme.spacing(0),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginTop: theme.spacing(-4)
    }
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 150,
    borderRadius: theme.spacing(1)
  },
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

DiscoverDeliveryService.propTypes = {
  className: PropTypes.string
};

function DiscoverDeliveryService({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  // DEMO FILLER(DATA) FOR DELIVERY SERVICE
  const demoDeliveryService = [
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

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };

  //HOOK TO FIGURE OUT THE IF THE CARD HAS BEEN EXPANDED OR NOT
  const [expanded, setExpanded] = React.useState(false);

  // HANDLES THE EXPAND FUNCTION FOR MORE DETAILS ON THE CARDS
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Delivery</h1>
        <Button className={classes.HeaderBtn} variant="outlined">
          View
        </Button>
      </div>
      <div className={classes.display}>
        {demoDeliveryService.map(
          ({ id, image1, letter, rating, status, intro, type }) => (
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {letter}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={id}
                subheader={rating}
              />
              <CardMedia
                className={classes.media}
                image={image1}
                title="Paella dish"
              />
              <Box className={classes.contentContainer}>
                <CardContent className={classes.content}>
                  <Typography variant="subtitle2">{type}</Typography>
                  {/* <Typography variant="subtitle2">{orderType}</Typography> */}
                </CardContent>
                <CardActions disableSpacing className={classes.actions}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <Button variant="outlined" className={classes.visitBtn}>
                    Visit
                  </Button>
                </CardActions>
              </Box>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default DiscoverDeliveryService;
