import { makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: theme.spacing(65),
    height: theme.spacing(52),
    cursor: 'pointer',
    ['@media (max-width: 1367px)']: {
      margin: theme.spacing(1),
      width: theme.spacing(28),
      height: theme.spacing(20)
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
    height: theme.spacing(35)
  }
}));

QuickTips.propTypes = {
  className: PropTypes.string
};

function QuickTips({ className, ...other }) {
  const classes = useStyles();

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
                {/* <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default QuickTips;
