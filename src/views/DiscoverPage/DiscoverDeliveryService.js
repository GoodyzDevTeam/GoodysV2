import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Card, Typography } from '@material-ui/core';
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
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { ajaxUrl } from 'src/config';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    maxWidth: 300,
    maxHeight: 400,
    ['@media (min-width: 1920px)']: {
      maxWidth: 350,
      maxHeight: 440
    },
  },
  titleText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: theme.spacing(-3),
    textOverflow: 'ellipsis'
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: '#00AB55'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-start'
    // marginTop: theme.spacing(5),
    // marginBottom: theme.spacing(2),
    // marginLeft: theme.spacing(2)
  },
  HeaderBtn: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    marginTop: '5px',
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
  className: PropTypes.string,
  viewAll: PropTypes.any,
  setViewAll: PropTypes.func,
};

function DiscoverDeliveryService({ className, viewAll, setViewAll, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [delivery, setDelivery] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${ajaxUrl}/api/delivery/`);
    if (viewAll == '')
      setDelivery(response.data.slice(0, 4));
    else setDelivery(response.data);
  
    return () => {
      setDelivery([]);
    }
  }, []);

  const handleViewAll = (e) => {
    if (viewAll == '') {
      setViewAll('deliveries');
    } else {
      setViewAll('');
    }
  };

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
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        <Grid item xs={12} className={classes.header}>
          <Typography variant='h3'>
            Delivery
          </Typography>
          <Button
            className={classes.HeaderBtn}
            variant="outlined"
            onClick={handleViewAll}
          >
            {viewAll == '' ? "View" : "Back"}
          </Button>
        </Grid>
      </Grid>
      {/* <div className={classes.display}> */}
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        {delivery &&
          delivery.map(
            ({ name, mainImage, letter, rating, status, intro, type }) => (
              <Grid item xs={12} sm={6} md={3}>
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
                  title={name}
                  subheader={rating}
                  className={classes.titleText}
                />
                <CardMedia
                  className={classes.media}
                  image={mainImage}
                  title="Paella dish"
                />
                {/* <Box className={classes.contentContainer}> */}
                  <CardContent className={classes.content}>
                    <Typography variant="subtitle2">{type}</Typography>
                    {/* <Typography variant="subtitle2">{orderType}</Typography> */}
                  </CardContent>
                  <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <Button variant="outlined" className={classes.visitBtn}>
                      Visit
                    </Button>
                  </CardActions>
                {/* </Box> */}
              </Card>
              </Grid>
            )
          )}
          </Grid>
      {/* </div> */}
    </div>
  );
}

export default DiscoverDeliveryService;
