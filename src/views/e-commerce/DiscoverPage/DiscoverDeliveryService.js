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

DiscoverDeliveryService.propTypes = {
  className: PropTypes.string
};

const PERCENT = 2.6;
const TOTAL_USER = 18765;

function DiscoverDeliveryService({ className, ...other }) {
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Delivery Services</h1>
        <Button className={classes.HeaderBtn} variant="outlined">
          View All
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
              <CardContent>
                <Typography>{type}</Typography>
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

export default DiscoverDeliveryService;
