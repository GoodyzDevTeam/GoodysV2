import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Link, Typography } from '@material-ui/core';
import { getImgProduct } from 'src/utils/getImages';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { map } from 'lodash';
import { PATH_APP } from 'src/routes/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // padding: theme.spacing(3.5),
    margin: theme.spacing(1),
    width: theme.spacing(38),
    height: theme.spacing(20),
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(5)
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    alignItems: 'center'
  },
  cover: {
    width: '50%',
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

Topics.propTypes = {
  className: PropTypes.string
};

function Topics({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const topicOptions = [
    {
      id: 'Cannabis 101',
      image1: `https://leafly-cms-production.s3-us-west-2.amazonaws.com/legacy/content/whats-the-difference-between-joints-blunts-and-spliffs/qQEfyIK6QcWMvLfVViJ5_2.jpg?auto=format,compress&w=550`
    },
    {
      id: 'Products & Strains',
      image1: `https://leafly-cms-production.imgix.net/wp-content/uploads/2021/03/18121042/Houseplant_Indica_Pink-Moon-for-web.jpeg?auto=compress,format&w=1440&dpr=1`
    },
    // {
    //   id: 'Flower',
    //   image1: `https://leafly-cms-production.imgix.net/wp-content/uploads/2021/03/18121042/Houseplant_Indica_Pink-Moon-for-web.jpeg?auto=compress,format&w=1440&dpr=1`
    // },
    {
      id: 'CBD',
      image1: `https://leafly-cms-production.imgix.net/wp-content/uploads/2019/11/05144557/header_CBD-Guide-Header-1901-x-1201-Option-1.png?auto=compress,format&w=740&dpr=2`
    },
    {
      id: 'Laws',
      image1: `https://leafly-cms-production.imgix.net/wp-content/uploads/2019/07/08114551/montana-cannabis-boom-patients.png?auto=compress,format&w=740&dpr=2`
    },
    {
      id: 'Cultivation',
      image1: `https://leafly-cms-production.imgix.net/wp-content/uploads/2020/05/27132104/Oregon-cannabis-field-2-1024x640.jpg?auto=format,compress&w=550`
    }
  ];

  const image = {
    small: getImgProduct(600),
    medium: getImgProduct(960)
  };
  return (
    <div>
      <div className={classes.header}>
        <h1>Topics</h1>
      </div>
      <div className={classes.display}>
        {topicOptions.map(({ id, image1 }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1 }}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    <Link href={PATH_APP.management.eCommerce.products}>
                      {id}
                    </Link>
                  </Typography>
                </CardContent>
              </div>
            </Box>
            <CardMedia className={classes.cover} image={image1} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Topics;
