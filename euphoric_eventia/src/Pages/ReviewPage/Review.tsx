import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PaymentForm from '../PaymentPage/PaymentForm.tsx';
import { Form, Payment } from '../../components/formTypes.tsx';
import {Event} from '../../components/eventTypes.tsx';


interface ReviewProps {
  formData: Form & Payment;
  onInputChange: (data: Record<string, any>) => void;
}

interface EventDataState {
  eventData: any; // Replace 'any' with a more specific type according to your data structure
}

interface TotalAmountState {
  totalAmount: number;
}

interface RootState {
  eventData: EventDataState;
  totalAmount: TotalAmountState;
}

export default function Review({ formData}: ReviewProps) {
  const eventData = useSelector((state:RootState) => state.eventData.eventData);
  const totalAmount = useSelector((state:RootState) => state.totalAmount.totalAmount);

  const [paymentData, setPaymentData] = useState({
    name: formData?.cardName || 'John Smith',
    cardEnding: formData?.cardNumber ? `****${formData.cardNumber.slice(-4)}` : '****',
  });

  const handleInputChange = (formData: { cardName?: string; cardNumber?: string }) => {
    const { cardName, cardNumber } = formData;
    setPaymentData({
      name: cardName || '',
      cardEnding: cardNumber ? `****${cardNumber.slice(-4)}` : '****',
    });
  };

  const products: { name: string; desc: string; price?: string }[] = [
    {
      name: 'Event Name',
      desc: eventData?.eventName || 'N/A',
    },
    {
      name: 'Start Date',
      desc: eventData?.eventDate?.startDate.replace('T', ' ') || 'N/A',
    },
    {
      name: 'End Date',
      desc: eventData?.eventDate?.endDate.replace('T', ' ') || 'N/A',
    },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            {product.price && <Typography variant="body2">{product.price}</Typography>}
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {`$${totalAmount.toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment done by:
          </Typography>
          <Typography gutterBottom>{paymentData.name}</Typography>
          <Typography gutterBottom>{`Card ending with: ${paymentData.cardEnding}`}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );  
}
