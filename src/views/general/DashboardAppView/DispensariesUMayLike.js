import { merge } from 'lodash';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader, Button, Typography, Box } from '@material-ui/core';
import { getImgDispensary } from 'src/utils/getImages';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { ajaxUrl } from 'src/config';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex'
  },
  title1: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-3)
  },
  media: {
    height: 0,
    marginTop: theme.spacing(6),
    paddingTop: '56.25%'
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
    borderRadius: theme.spacing(1)
  },
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

DispensariesUMayLike.propTypes = {
  className: PropTypes.string
};

function DispensariesUMayLike({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [likeDispensary, setLikeDispensary] = useState();

  useEffect(async () => {
    const curAccessToken = window.localStorage.getItem('accessToken');
    if (curAccessToken && isValidToken(curAccessToken)) {
      setSession(curAccessToken);
      const response = await axios.get(
        `${ajaxUrl}/api/dispensary/like-dispensary`
      );
      console.log(response.data);
      setLikeDispensary(response.data);
    }
  }, []);

  const demoProduct = [
    {
      id2: 'Med Men',
      rating: '4.2 stars ',
      distance: '0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cana',
      rating: '4.0 stars ',
      distance: 'Canoga Park | 0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cloud 3C',
      rating: '4.1 stars ',
      distance: '0.8 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Med Men',
      rating: '4.2 stars ',
      distance: '0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/025/464/avatar/original/1612394752-Logo.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cana',
      rating: '4.0 stars ',
      distance: 'Canoga Park | 0.5 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/073/979/avatar/original/1605224149-Divine_Wellness_Avatar.png?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    },
    {
      id2: 'Cloud 3C',
      rating: '4.1 stars ',
      distance: '0.8 miles',
      letter: 'R',
      image1: `https://images.weedmaps.com/deliveries/000/062/538/avatar/original/1575082012-elevate_logo.jpg?w=274&dpr=1&auto=format`,
      type: 'Medical & Recreational'
    }
  ];
  const images = {
    small: getImgDispensary(600),
    medium: getImgDispensary(960)
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Dispensaries You May Like</h1>
      </div>
      <div className={classes.display}>
        {likeDispensary &&
          likeDispensary.map(
            ({ name, rating, distance, letter, mainImage, type }) => (
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
                />
                <CardMedia
                  className={classes.media}
                  image={mainImage}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography>{type}</Typography>
                  <Typography>{distance}</Typography>
                </CardContent>
                <CardActions disableSpacing>
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
              </Card>
            )
          )}
      </div>
    </div>
  );
}

export default DispensariesUMayLike;
