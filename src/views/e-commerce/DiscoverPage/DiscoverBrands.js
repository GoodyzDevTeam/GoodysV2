import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { map } from 'lodash';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    width: theme.spacing(45),
    // height: theme.spacing(60),
    padding: theme.spacing(3.5),
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
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
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 150,
    // marginTop: theme.spacing(6),
    borderRadius: theme.spacing(1)
  }
  // controls: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   paddingLeft: theme.spacing(1),
  //   paddingBottom: theme.spacing(1)
  // },
  // playIcon: {
  //   height: 38,
  //   width: 38
  // },
  // trending: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginTop: theme.spacing(1.5),
  //   marginBottom: theme.spacing(0.5)
  // },
  // trendingIcon: {
  //   width: 24,
  //   height: 24,
  //   display: 'flex',
  //   borderRadius: '50%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginRight: theme.spacing(1),
  //   color: theme.palette.primary.main,
  //   backgroundColor: alpha(theme.palette.primary.main, 0.16)
  // },
  // isTrendingDown: {
  //   color: theme.palette.error.main,
  //   backgroundColor: alpha(theme.palette.error.main, 0.16)
  // }
}));

// ----------------------------------------------------------------------

DiscoverBrands.propTypes = {
  className: PropTypes.string
};

const PERCENT = 2.6;
const TOTAL_USER = 18765;

function DiscoverBrands({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [
    { data: [2532, 6632, 4132, 8932, 6332, 2532, 4432, 1232, 3632, 932, 3354] }
  ];
  const chartOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', endingShape: 'rounded' } },
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      },
      marker: { show: false }
    }
  };

  const demoDeliveryService = [
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
        <h1>Discover Brands</h1>
        <Button className={classes.HeaderBtn} variant="outlined">
          View All
        </Button>
      </div>
      <div className={classes.display}>
        {demoDeliveryService.map(
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
              <CardContent>
                <Typography>{type}</Typography>
                <Typography>{orderType}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{status}</Typography>
                  <Typography paragraph>{intro}</Typography>
                  <Typography paragraph></Typography>
                  <Typography paragraph></Typography>
                  <Typography></Typography>
                </CardContent>
              </Collapse>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default DiscoverBrands;
