import { Link, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { PATH_APP } from 'src/routes/paths';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: theme.spacing(65),
    height: theme.spacing(33),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(40)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(45)
    },
    //large desktop
    ['@media (min-width: 2024px)']: {
      margin: theme.spacing(1),
      width: theme.spacing(65),
      height: theme.spacing(45)
    }
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  img: {
    height: theme.spacing(15),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      width: theme.spacing(40),
      height: theme.spacing(20)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(55),
      height: theme.spacing(26)
    },
    //large desktop
    ['@media (min-width: 2024px)']: {
      width: theme.spacing(65),
      height: theme.spacing(30)
    }
  },
  favBtn: {
    marginLeft: 'auto'
  },
  actions: {
    marginTop: theme.spacing(-2)
  }
}));

QuickTips.propTypes = {
  className: PropTypes.string
};

function QuickTips({ className, ...other }) {
  const classes = useStyles();
  const [location, setLocation] = useState(useLocation()); //GRAB USE LOCATION OBJECT REACT-ROUTER
  // const [favBtn, setFavBtn] = useState(false);

  // DEMO FILLER(DATA) FOR TIPS
  const tips = [
    {
      title: 'Difference Between Bad And Good Weed',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/07/Rosin-Tech-Weed_07.jpg`
    },
    {
      title: 'What Does It Feel Like To Be High?',
      image: `https://weedmaps.com/learn/wp-content/uploads/2021/02/CRTV-3754_10_2020_Oct_Bubbler_830-2.jpg`
    },
    {
      title: 'First Time Smoking Weed?',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/07/CRTV-648_WMMW-LA_0374.jpg`
    },
    {
      title: 'A Guide To Cannabis Product Types',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/08/181008_BluntSesh198.jpg`
    },
    {
      title: 'How Much Is An Eighth?',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/09/CRTV-3983_January-Learn_Grams-Pound_016-scaled.jpg`
    },
    {
      title: 'How To Roll A Joint',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/08/CRTV-2901_How-to-roll-a-joint_05-1.jpg`
    }
  ];

  return (
    <div>
      <div className={classes.header}>
        <h1>Quick Tips</h1>
      </div>
      <div className={classes.display}>
        {tips.map(({ title, image }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <CardActionArea>
              <CardMedia
                className={classes.img}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                <Link href={PATH_APP.management.blog.learnArticles}>
                  Learn More
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default QuickTips;
