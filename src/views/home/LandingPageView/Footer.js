import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import { Link as ScrollLink } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Container, Typography, Box, Card } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    padding: theme.spacing(5, 0)
  },
  list: {
    listStyle: 'none'
  },
  card: {
    backgroundColor: '#00AB55',
    color: 'white',
    padding: theme.spacing(2),
    width: theme.spacing(20)
  }
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  className: PropTypes.string
};

function Footer({ className }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={clsx(classes.root, className)}>
      <Box>
        <ScrollLink to="move_top" spy={true} smooth={true}>
          Goody's
        </ScrollLink>
        <Typography variant="caption">
          © All rights reserved
          <br /> Made by &nbsp;
          <Link href="https://minimals.cc/">minimals.cc</Link>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6"> About </Typography>
        <ul className={classes.list}>
          <Typography variant="subtitle2">Company</Typography>
          <Typography variant="subtitle2">Careers</Typography>
          <Typography variant="subtitle2">Help Centyer</Typography>
        </ul>
      </Box>
      <Box>
        <Typography variant="h6"> Legal </Typography>
        <ul className={classes.list}>
          <Typography variant="subtitle2">Company</Typography>
          <Typography variant="subtitle2">Careers</Typography>
          <Typography variant="subtitle2">Help Centyer</Typography>
        </ul>
      </Box>
      <Box>
        <Typography variant="h6"> Discover </Typography>
        <ul className={classes.list}>
          <Typography variant="subtitle2">Dispensaries</Typography>
          <Typography variant="subtitle2">Deliveries</Typography>
          <Typography variant="subtitle2">Doctors</Typography>
          <Typography variant="subtitle2">Nearby deals</Typography>
          <Typography variant="subtitle2">Strains</Typography>
          <Typography variant="subtitle2">News</Typography>
          <Typography variant="subtitle2">Gear</Typography>
          <Typography variant="subtitle2">Recently viewed</Typography>
        </ul>
      </Box>
      <Box>
        <Card className={classes.card}>
          <Typography variant="h6"> Business </Typography>
          <ul className={classes.list}>
            <Typography variant="subtitle2">Get Started</Typography>
            <Typography variant="subtitle2">Add A Business</Typography>
            <Typography variant="subtitle2">For Retailers</Typography>
            <Typography variant="subtitle2">For Brands</Typography>
            <Typography variant="subtitle2">For Advertisers</Typography>
            <Typography variant="subtitle2">For Developers</Typography>
          </ul>
        </Card>
      </Box>
    </Container>
  );
}

export default Footer;
