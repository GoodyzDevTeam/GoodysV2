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
import MailIcon from '@material-ui/icons/Mail';
import { Button, Card, Typography } from '@material-ui/core';
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
import { BorderRight } from '@material-ui/icons';
import MaximizeIcon from '@material-ui/icons/Maximize';
import { stubFalse } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(40),
    height: theme.spacing(25),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2.5),
    cursor: 'pointer',
    display: 'flex'
    //tablet
    // ['@media (min-width:768)']:{
    //   marginLeft: theme.spacing(5),
    //   marginRight: 'auto'
    // }
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: theme.spacing(40),
    textAlign: 'center'
  },
  // details: {
  //   display: "flex",
  //   flexDirection: "column"
  // },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 150,
    borderRadius: theme.spacing(1)
  },
  fullList: {
    width: 'auto'
  },
  drawercontainer: {
    backgroundColor: 'red',
    height: theme.spacing(10)
  },
  // drawer: {
  //   position: 'absolute',
  //   bottom: '0%'
  // },
  container: {
    borderRight: 'solid 1px white'
  },
  container1: {
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  line: {
    marginTop: theme.spacing(2)
  }
}));

function DispensaryPickup() {
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

  const list = (anchor) => (
    <div
      className={classes.display}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MaximizeIcon className={classes.line} />
      <div className={classes.display}>
        {demoDispensary.map(({ id, image1, letter, rating, type, status }) => (
          <Card className={classes.root}>
            <div className={classes.container}>
              <CardHeader
                className={classes.container1}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {letter}
                  </Avatar>
                }
                action={<Typography>{type}</Typography>}
                title={id}
                subheader={rating}
              />
            </div>
            <div className={classes.container2}>
              <CardMedia
                className={classes.media}
                image={image1}
                title="Paella dish"
                className={classes.img}
              />
            </div>
            {/* <CardContent>
              <Typography>{type}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button variant="outlined">Visit</Button>
            </CardActions> */}
          </Card>
        ))}
      </div>
    </div>
  );

  const anchor1 = 'bottom';

  return (
    <div className={classes.drawer}>
      {['view'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.btn}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          </div>
          <SwipeableDrawer
            anchor={anchor1}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, false)}
            // className={classes.drawercontainer}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DispensaryPickup;
