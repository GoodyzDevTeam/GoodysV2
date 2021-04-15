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
import NextPageBtn from './NextPageBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: theme.spacing(50),
    height: theme.spacing(50),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      width: theme.spacing(85),
      height: theme.spacing(45)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(71),
      height: theme.spacing(50)
    },
    //large desktop
    ['@media (min-width: 1824px)']: {
      width: theme.spacing(112),
      height: theme.spacing(70)
    }
  },
  subTopicRoot: {
    margin: theme.spacing(1),
    width: theme.spacing(50),
    height: theme.spacing(50),
    cursor: 'pointer',
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      width: theme.spacing(42),
      height: theme.spacing(45)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(35),
      height: theme.spacing(50)
    },
    //large desktop
    ['@media (min-width: 1824px)']: {
      width: theme.spacing(55),
      height: theme.spacing(70)
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
    height: theme.spacing(30),
    //tablet
    ['@media (min-width: 650px) and (max-width: 1023px)']: {
      height: theme.spacing(30)
    },
    //desktop
    ['@media (min-width: 1024px)']: {
      width: theme.spacing(72),
      height: theme.spacing(33)
    },
    //large desktop
    ['@media (min-width: 1824px)']: {
      width: '100%',
      height: theme.spacing(55)
    }
  },
  nextBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    width: '93%'
  },
  actions: {
    marginTop: theme.spacing(-4)
  },
  title: {
    overflow: 'hidden'
  }
}));

LearnCannabis101.propTypes = {
  className: PropTypes.string
};

function LearnCannabis101({ className, ...other }) {
  const classes = useStyles();

  const demoCannabis101MainTopic = [
    {
      title: 'What is cannabis',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://weedmaps.com/learn/wp-content/uploads/2018/10/CRTV-3430_2020_Design-Language_Plant_125-2.jpg`
    }
  ];

  const demoCannabis101SubTopics = [
    {
      title: 'What are live resin cannabis concentrates',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://leafly-cms-production.imgix.net/wp-content/uploads/2020/08/06143012/dabtabs-2.jpg?auto=compress,format&w=740&dpr=2`
    },
    {
      title: '3 ways to use your weed stem',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://weedmaps.com/learn/wp-content/uploads/2017/12/CRTV-3983_January-Learn_Grams-Ounce.jpg`
    },
    {
      title: 'Can cannabis help with body-damaging behaviors?',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://leafly-cms-production.imgix.net/wp-content/uploads/2019/11/05144557/header_CBD-Guide-Header-1901-x-1201-Option-1.png?auto=compress,format&w=740&dpr=2`
    },
    {
      title: 'What are cannabis vapes?',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://leafly-cms-production.imgix.net/wp-content/uploads/2021/03/30085102/Sponsored-Article-Hero.jpg?auto=compress,format&w=740&dpr=2`
    },
    {
      title: 'What is limonene and what does this cannabis terpene do?',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://weedmaps.com/learn/wp-content/uploads/2018/07/CRTV-3358_Social-710_Project-Terpene_linalool_16x9-2048x1152.jpg`
    },
    {
      title: 'Quiz: How Well Do You Know the Differen Consumption  Methods?',
      aurthor: 'Jon Doe',
      date: 'March 31, 2021',
      image: `https://weedmaps.com/learn/wp-content/uploads/2020/07/032A3082-2.jpg`
    }
  ];

  return (
    <div>
      <h1 className={classes.header}> Cannabis 101 </h1>
      <div className={classes.display}>
        {demoCannabis101MainTopic.map(({ title, aurthor, date, image }) => (
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {title}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
        {demoCannabis101SubTopics.map(({ title, aurthor, date, image }) => (
          <Card className={clsx(classes.subTopicRoot, className)} {...other}>
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {title}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
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
      <div className={classes.nextBtn}>
        <NextPageBtn />
      </div>
    </div>
  );
}

export default LearnCannabis101;
