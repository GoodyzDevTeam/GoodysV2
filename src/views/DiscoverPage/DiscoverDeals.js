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
  headerBtnContainer: {
    marginLeft: 'auto',
    //dekstop
    ['@media (min-width: 1175px)']: {
      marginLeft: theme.spacing(-20)
      // marginRight: theme.spacing(20)
    }
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
  actions: {
    marginTop: theme.spacing(0),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginTop: theme.spacing(-4)
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
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

DiscoverDeals.propTypes = {
  className: PropTypes.string
};

function DiscoverDeals({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  // DEMO FILLER(DATA) FOR DEALS
  const demoDeals = [
    {
      id: 'The Syndicate',
      image1: `https://images.weedmaps.com/dispensaries/000/042/360/avatar/original/1535233097-Shop___1_of_1_.jpg?w=274&dpr=1&auto=format`,
      letter: 'S',
      rating: '4.4 stars',
      type: 'Medical & Recreational',
      status: 'Store Front',
      orderType: 'In-Store Purchase Only',
      intro: `The Syndicate is a recreational dispensary that has been providing our customers with the highest quality cannabis for over ten years! With four open dispensaries, and three more coming by the end of Spring 2021; we hope to expand our reach to provide Southern California with the finest quality cannabis, as well as the best recreational and medicinal experience possible. With fifteen cannabis licenses, soon to be four cultivations, and three distribution centers, we are now proud to hold the title as a vertically integrated cannabis company.`
    },
    {
      id: 'Cana',
      image1: `https://images.weedmaps.com/dispensaries/000/000/783/avatar/original/1543872578-cana_logo_full.JPG?w=274&dpr=1&auto=format`,
      letter: 'C',
      rating: '4.5 stars',
      type: 'Medical & Recreational',
      status: 'Store Front',
      orderType: 'In-Store Purchase Only',
      intro: `Experience the legacy of Divine Wellness Center Since 2007. One of LA’s longest operating PRE-ICO medical and now recreational cannabis collective. Our mission at Divine Wellness is simple, to provide our members excellent service with knowledgeable staff ready to answer all your questions about your canna-needs & products with superlative quality! We can guarantee you our large selection is connoisseur crafted & curated often to assure you the freshest quality of product currently available. After all, variety is the spice of life!`
    },
    {
      id: 'The Plant',
      image1: `https://images.weedmaps.com/dispensaries/000/062/714/avatar/original/1576473265-THE_PLANT_BEST_GOLD_WEEDMAPS_R1-01.png?w=274&dpr=1&auto=format`,
      letter: 'P',
      rating: '4.8 stars',
      type: 'Medical & Recreational',
      status: 'Store Front',
      orderType: 'Order Online (pickup)',
      intro: `We are WALKING DISTANCE  from THE VILLAGE, WESTFIELD TOPANGA MALL, AMC, PF CHANGS, BEST BUY, THE MARRIOT, COSTCO, HILTON, WARNER CENTER PARK, VICTORY BLVD. We are THE PLANT. If it's in the plant, it's in THE PLANT. Located in downtown WOODLAND HILLS WARNER CENTER: 21759 ERWIN ST. *CROSS STREETS TOPANGA CYN & ERWIN ST. Yes, we are right next to MCDONALDS, STAPLES, FIRST BANK! We have TONS OF PARKING, SECURITY, and SHARE A BUILDING WITH A BANK! Come for edibles, flowers, pre-rolls, tinctures, drinks, gummies, cbd, balms, chocolates, more flowers, cookies, cannabis wine & spirits, Horchata.. yes horchata!`
    },
    {
      id: 'Cookies',
      image1: `https://images.weedmaps.com/dispensaries/000/018/302/avatar/square_fill/1594959840-cookies.jpg`,
      letter: 'C',
      rating: '4.6 stars',
      type: 'Medical & Recreational',
      status: 'Store Front',
      orderType: 'Order Online (pickup)',
      intro: `Welcome to Cookies Woodland Hills, on the corner of Ventura Blvd & Alhama Drive! We provide quality cannabis goods for your Legal Medical & Recreational needs.`
    }
  ];

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Deals</h1>
        <Button className={classes.HeaderBtn} variant="outlined">
          View
        </Button>
      </div>
      <div className={classes.display}>
        {demoDeals.map(
          ({ id, image1, letter, rating, status, intro, type, orderType }) => (
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
                  <Typography variant="subtitle2">{orderType}</Typography>
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

export default DiscoverDeals;
