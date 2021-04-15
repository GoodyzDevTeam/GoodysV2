import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import DarkMode from './DarkMode';
import Page from 'src/components/Page';
import Minimal from './Minimal';
import LandingPageDiscover from './LandingPageDiscover';
import { makeStyles } from '@material-ui/core/styles';
import LandingPageLearn from './LandingPageLearn';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));

function LandingPageView() {
  const classes = useStyles();

  return (
    <Page
      title="The starting point for your next project | Minimal-UI"
      id="move_top"
      className={classes.root}
    >
      <Hero />
      <div className={classes.content}>
        <Minimal />
        <LandingPageDiscover />
        <LandingPageLearn />
        <Footer />
      </div>
    </Page>
  );
}

export default LandingPageView;
