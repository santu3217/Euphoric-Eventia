import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../AddressPage/AddressForm.tsx';
import PaymentForm from '../PaymentPage/PaymentForm.tsx';
import Review from '../ReviewPage/Review.tsx';
import {Form} from '../../components/formTypes.tsx';
import {Event} from '../../components/eventTypes.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface EmailData {
  to: string;
  subject: string;
  text: string;
}

interface formData{
    formData: Form;
}

interface EventCardProps {
  eventData: Event;
}

const steps = ['Personal details', 'Payment details', 'Review your order'];

// switching between the pages
function getStepContent(
  step: number,
  handleInputChange: (data: any) => void,
  formData: any,
  eventData: any
) {
  switch (step) {
    case 0:
      return <AddressForm onInputChange={handleInputChange} formData={formData} />;
    case 1:
      return <PaymentForm onInputChange={handleInputChange} formData={formData} />;
    case 2:
      return <Review onInputChange={handleInputChange} formData={formData}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {

  const navigate = useNavigate();

  // navigate to login if user not loggedin
  useEffect(() => {
      if (!localStorage.getItem('userEmail')){
      navigate('/login')
      }
  }, [])

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [eventData, setEventData] = useState<any>({});


  useEffect(() => {
    // Retrieve eventData from location state
    const locationState = window.history.state;
    if (locationState && locationState.eventData) {
      setEventData(locationState.eventData);
    }
  }, []);

  // uppdate on input change
  const handleInputChange = (data: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
    }));
  };

  // update on next
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Email sending logic
      const emailData: EmailData = {
        to: 'mallugarisantoshreddy@gmail.com', // Replace with actual recipient's email
        subject: 'Order Confirmation',
        text: 'Your Ticket has been Booked!',
      };
      // sending email after booking event
      try {
        const response = await axios.post('http://localhost:3000/send-email', {
            to: localStorage.getItem('userEmail'),
            subject: 'Order Confirmation',
            text: 'Your Ticket has been Booked!'
          });

        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

      } catch (error) {
        console.error('Error:', error);
        // Handle errors appropriately
      }
    }

    // Logic to move to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4, marginTop:"90px" }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleInputChange, formData, eventData)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );

}
