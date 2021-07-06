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
    minWidth: 300,
    maxHeight: 450
    // width: theme.spacing(45),
    // padding: theme.spacing(3.5),
    // margin: theme.spacing(1),
    // cursor: 'pointer',
    // //tablet
    // ['@media (min-width: 650px) and (max-width: 1175px)']: {
    //   width: theme.spacing(28),
    //   height: theme.spacing(40),
    //   padding: theme.spacing(0)
    // }
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
  const [deal, setDeal] = useState([]);

  useEffect(async () => {
    const curAccessToken = window.localStorage.getItem('accessToken');
    if (curAccessToken && isValidToken(curAccessToken)) {
      setSession(curAccessToken);
      const response = await axios.get(`${ajaxUrl}/api/deal/`);
      setDeal(response.data);
    }
  }, []);

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
      {/* <div className={classes.display}> */}
      <Grid container spacing={2} xs={12} md={12} sx={{ p: 3 }} >
        {deal &&
          deal.map(
            ({
              name,
              mainImage,
              letter,
              rating,
              status,
              intro,
              type,
              orderType
            }) => (
              <Grid item>
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
              </Grid>
            )
          )}
          </Grid>
      {/* </div> */}
    </div>
  );
}

export default DiscoverDeals;
