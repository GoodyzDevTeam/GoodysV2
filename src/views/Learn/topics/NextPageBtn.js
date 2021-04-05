import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  btn: {
    marginRight: theme.spacing(1)
  }
}));

NextPageBtn.propTypes = {
  className: PropTypes.string
};

function NextPageBtn({ clasName, ...other }) {
  const classes = useStyles();
  return (
    <div>
      <Button variant="outlined" className={classes.btn} disabled>
        <KeyboardArrowLeftIcon />
      </Button>
      <Button variant="outlined">
        <KeyboardArrowRightIcon />
      </Button>
    </div>
  );
}

export default NextPageBtn;
