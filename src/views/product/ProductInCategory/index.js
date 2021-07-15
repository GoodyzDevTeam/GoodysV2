import Page from 'src/components/Page';
import { getProducts } from 'src/redux/slices/user';
import React, { useState, useEffect } from 'react';
import { visuallyHidden } from '@material-ui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  sortSpan: visuallyHidden
}));

function UserListView() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Product In Category | Minimal-UI" className={classes.root}>
      <Container>
      {products &&
        products.map(({ name, price, mainImage, weight }) => (
          <Card className={clsx(classes.root, className)} {...other}>
            <Box sx={{ flexGrow: 1, width: '50%' }}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    className={classes.title}
                    component="h6"
                    variant="h6"
                  >
                    {name}
                  </Typography>
                  <Typography
                    className={classes.title}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {price}
                  </Typography>
                  <Typography
                    className={classes.title}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {weight}
                  </Typography>
                  <Button variant="outlined"> View </Button>
                </CardContent>
              </div>
            </Box>
            <CardMedia
              className={classes.cover}
              image={mainImage}
            />
          </Card>
        ))}
      </Container>
    </Page>
  );
}

export default UserListView;
