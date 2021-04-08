import { merge } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
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

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: 'left'
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
  chart: {
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
      overflow: 'visible'
    },
    '& .apexcharts-legend': {
      height: LEGEND_HEIGHT,
      alignContent: 'center',
      position: 'relative !important',
      borderTop: `solid 1px ${theme.palette.divider}`,
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
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
    borderRadius: theme.spacing(1)
  },
  visitBtn: {
    marginLeft: 'auto'
  }
}));

// ----------------------------------------------------------------------

CurrentDownload.propTypes = {
  className: PropTypes.string
};

function CurrentDownload({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const chartData = [12244, 53345, 44313, 78343];
  const chartOptions = merge(ApexChartsOption(), {
    colors: [
      theme.palette.primary.lighter,
      theme.palette.primary.light,
      theme.palette.primary.main,
      theme.palette.primary.dark
    ],
    labels: ['Mac', 'Window', 'iOS', 'Android'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: function (val) {
                return fNumber(val);
              }
            },
            total: {
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return fNumber(sum);
              }
            }
          }
        }
      }
    }
  });

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
        {demoProduct.map(({ id2, rating, distance, letter, image1, type }) => (
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
              title={id2}
              subheader={rating}
            />
            <CardMedia
              className={classes.media}
              image={image1}
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
              {/* <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton> */}
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{status}</Typography>
                <Typography paragraph>{intro}</Typography>
                <Typography paragraph></Typography>
                <Typography paragraph></Typography>
                <Typography></Typography>
              </CardContent>
            </Collapse> */}
          </Card>
          // <Card className={clsx(classes.root, className)} {...other}>
          //   <CardHeader className={classes.title1} title={id2} />
          //   <div dir="ltr">
          //     <Box
          //       component="img"
          //       alt="image"
          //       src={images}
          //       srcSet={`${images.small} 600w, ${images.medium} 960w`}
          //       sx={{
          //         width: '100%',
          //         objectFit: 'cover',
          //         height: { xs: 280, xl: 320 }
          //       }}
          //     />
          //     <Typography variant="subtitle1">{distance}</Typography>
          //     <h4>Medical & Recreational</h4>
          //     <Typography variant="subtitle1">{rating}</Typography>
          //     <Button variant="outlined">Visit</Button>
          //   </div>
          // </Card>
        ))}
      </div>
    </div>
  );
}

export default CurrentDownload;
