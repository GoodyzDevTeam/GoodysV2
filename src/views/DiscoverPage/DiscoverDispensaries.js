import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
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
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { ajaxUrl } from 'src/config';

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
  actions: {
    marginTop: theme.spacing(0),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1175px)']: {
      marginTop: theme.spacing(-4)
    }
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
  details: {
    display: 'flex',
    flexDirection: 'column'
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

DiscoverDispensaries.propTypes = {
  className: PropTypes.string
};

function DiscoverDispensaries({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [dispensary, setDispensary] = useState([]);

  useEffect(async () => {
    const curAccessToken = window.localStorage.getItem('accessToken');
    if (curAccessToken && isValidToken(curAccessToken)) {
      setSession(curAccessToken);
      const response = await axios.get(`${ajaxUrl}/api/dispensary/`);
      setDispensary(response.data);
    }
  }, []);

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
        <h1>Dispensaries</h1>
        <Button className={classes.HeaderBtn} variant="outlined">
          View
        </Button>
      </div>
      <div className={classes.display}>
        {dispensary &&
          dispensary.map(
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
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {letter}
                    </Avatar>
                  }
                  title={name}
                  subheader={rating}
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
            )
          )}
      </div>
    </div>
  );
}

export default DiscoverDispensaries;
