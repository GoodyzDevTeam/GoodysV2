import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import LazySize from 'src/components/LazySize';

const useStyles = makeStyles((theme) => ({
  root: {},
  descript: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  intro: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  post: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

function ArticlePost() {
  const classes = useStyles();
  const img = `https://cms-assets.eaze.com/content/2021/03/31215019/blog-no-text-1.png`;

  return (
    <div>
      <Box>
        <LazySize alt="article image" src={img} />
        <Box className={classes.descript}>
          <Typography variant="h3">Title</Typography>
          <Typography variant="subtitle2">1/2/21</Typography>
          <Typography variant="subtitle2">Aurthor: Jon Doe</Typography>
        </Box>
      </Box>
      <article>
        <Box className={classes.intro}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
        <Box className={classes.post}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enimad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam,quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
        </Box>
      </article>
    </div>
  );
}

export default ArticlePost;
