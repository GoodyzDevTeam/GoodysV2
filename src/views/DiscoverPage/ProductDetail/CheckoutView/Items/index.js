import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Card, Typography, IconButton, TextField } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import MinusIcon from '@material-ui/icons/Remove';
import PlusIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

const useStyles = makeStyles((theme) => ({
  option: {
		padding: '10px',
		marginLeft: '20px',
		marginRight: '20px',
		marginTop: '3px',
		marginBottom: '3px',
		cursor: 'pointer',
		borderRadius: '10px',
		"&:hover": {
			background: '#00ab55',
		},
	}
}));

const QuantityButton = styled(Button)(({ theme }) => ({
  width: '20px',
  maxWidth: '20px',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%'
}))


Items.propTypes = {
	step: PropTypes.number,
	next: PropTypes.func,
	product: PropTypes.object,
	dispensary: PropTypes.object,
	quantity: PropTypes.array,
	setQuantity: PropTypes.func,
};

function Items({ step, next, product, dispensary, quantity, setQuantity }) {
	const classes = useStyles();
	
	const QuantityAndPrice = ({ idx }) => {
		return (
			<Grid
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					border: 'solid thin #637381',
					borderRadius: {xs:'8px', md:'12px'},
					width: {xs:'90px', md:'100px'},
					justifyContent: 'center',
					p: 1
				}}
			>
				<QuantityButton
          onClick={() => {
            let temp = JSON.parse(JSON.stringify(quantity));
            if (temp[idx] == undefined || temp[idx] == null) temp[idx] = 0;
            temp[idx] = Math.max(0, temp[idx] - 1);
            setQuantity(temp);
          }}
          size="small" 
        >
					<MinusIcon />
				</QuantityButton>
				<input
          type="number"
          disabled
          value={(quantity[idx] == undefined || quantity[idx] == null) ? 0 : quantity[idx]}
          style={{
            border: 'none',
            width: '50px',
            textAlign: 'center',
            backgroundColor: 'white'
          }}
        />
				<QuantityButton
          onClick={() => {
            let temp = JSON.parse(JSON.stringify(quantity));
            if (temp[idx] == undefined || temp[idx] == null) temp[idx] = 0;
            temp[idx] = temp[idx] + 1;
            setQuantity(temp);
          }}
          size="small"
        >
					<PlusIcon />
				</QuantityButton>
      </Grid>
		);
	}
	
  return (
		<Card sx={{display:'flex', flexDirection:'column', alignItems:'center', p: 0, mt: 5, zIndex: 10 }}>
			<Typography>
				Items	
			</Typography>
			
			{dispensary && <Box sx={{ display: 'flex', mt: 3, mb: 3 }}>
				<Typography>
					Dispensary Name:
				</Typography>
				<Typography>
					{dispensary.name}
				</Typography>
			</Box>}
			<Box sx={{ display: 'flex', mt: 3, mb: 3 }}>
				<Typography>
					Product Name:
				</Typography>
				<Typography>
					{product.productName}
				</Typography>
			</Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Weight</TableCell>
						<TableCell>Price</TableCell>
						<TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{product.weightAndPrice.map((item, index) => {
						if (item) return (
							<TableRow key={index}>
								<TableCell sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.weight}</TableCell>
								<TableCell>{item.price}</TableCell>
								<TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
									<QuantityAndPrice idx={index} />
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
			<Box sx={{
				display:{xs:'flex', md: 'none'},
				justifyContent:{xs:'space-between',
				md:'default'},
				width:{xs:'100%', md:'default'}
			}}>
				<Button onClick={() => next(step - 1)} sx={{ float: { md: 'left'} }}>Back</Button>
				<Button onClick={() => next(step + 1)} sx={{ float: { md: 'right'} }}>Save & Next</Button>
			</Box>
		</Card>
	)
}

export default Items;
