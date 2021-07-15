import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Rating } from '@material-ui/core';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  dispensary: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px',
    maxHeight: '200px',
    minHeight: '200px',
    cursor: 'pointer',
  },
}));

DispensaryPickup.propTypes = {
  product: PropTypes.any,
  onConfirm: PropTypes.func,
  dispensaries: PropTypes.array
};

function DispensaryPickup({ product, dispensaries, onConfirm }) {
  const classes = useStyles();

  return (
    <Box sx={{ pt: 1, mr: 5, width: 'calc(30vw - 150px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h3" sx={{ color: '#42966b', mr: 1 }}>
          {product.productName}
        </Typography>
        <Typography variant="h4">
          is available
        </Typography>
      </Box>
      <Typography variant="h4">
        in below dispensaries.
      </Typography>
      
      <Card sx={{ display: 'flex-wrap', overflowY: 'scroll', mt: 1 }}> 
        {dispensaries && dispensaries.map((dispensary, index) => (
          <Grid key={index} xs={12} md={12}>
            <Card className={classes.dispensary}>
              <CardActionArea
                onClick={() => onConfirm(dispensary)}
                sx={{ display: 'flex', m: 0, p: 0, justifyContent: 'left' }}
              >
                <CardMedia
                  image={dispensary.mainImage}
                  title="Paella dish"
                  sx={{ height: '200px', width: '40%'}}
                />
                <Grid
                  xs={12}
                  md={6}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between' }}
                >
                  <Grid xs={12} md={12}>
                    <CardHeader
                      sx={{ display: 'flex', pt: 3, pl: 3, alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                      avatar={
                        <Avatar aria-label="recipe" sx={{ backgroundColor: '#00AB55' }}>
                          {dispensary.name[0]}
                        </Avatar>
                      }
                      title={dispensary.name}
                      subheader={`${dispensary.distance}km`}
                    />
                    <Typography sx={{ pl: 3, display:'flex', alignItems: 'center'}}>
                      <Rating
                        defaultValue={dispensary.rating}
                        icon={<StarBorderOutlined fontSize="inherit" />}
                        disabled
                        size='small'
                      />
                      {dispensary.rating}
                    </Typography>
                    <Typography sx={{ pl: 3, mt: 1, fontSize: '12px'}}>{dispensary.type}</Typography>
                    <Typography variant='subtitle2' sx={{ pl: 3 }}>{dispensary.orderType}</Typography>
                    <Typography sx={{ pl: 3, fontSize: '12px' }}>{dispensary.distance}km</Typography>
                  </Grid>
                  
                  {/* <Button
                    variant="outlined"
                    sx={{ textAlign: 'left', width: '80px', ml: 2, mb: 1 }}
                  >
                    Select
                  </Button> */}
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Card>
    </Box>
  );
}

export default DispensaryPickup;
