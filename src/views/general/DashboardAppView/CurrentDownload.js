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
    { id2: 'Med Men', rating: '4.2 stars ', distance: '0.5 miles' },
    { id2: 'Cana', rating: '4.0 stars ', distance: 'Canoga Park | 0.5 miles' },
    { id2: 'Cloud 3C', rating: '4.1 stars ', distance: '0.8 miles' }
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
        {demoProduct.map(({ id2, rating, distance }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <CardHeader className={classes.title1} title={id2} />
            <div dir="ltr">
              <Box
                component="img"
                alt="image"
                src={images}
                srcSet={`${images.small} 600w, ${images.medium} 960w`}
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  height: { xs: 280, xl: 320 }
                }}
              />
              <Typography variant="subtitle1">{distance}</Typography>
              <h4>Medical & Recreational</h4>
              <Typography variant="subtitle1">{rating}</Typography>
              <Button variant="outlined">Visit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CurrentDownload;
