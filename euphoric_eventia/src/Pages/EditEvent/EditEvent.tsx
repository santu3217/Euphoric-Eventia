import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdateEventById, fetchEventById } from '../../components/helpers.tsx';
import { Event } from '../../components/eventTypes.tsx';
import { SelectChangeEvent } from '@mui/material';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

interface EventFormProps {}

const EventForm: React.FC<EventFormProps> = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  // navigate to login if user not loggedin
  useEffect(() => {
    if (!localStorage.getItem('userEmail')){
      navigate('/login')
    }
  }, [])

  // initialize events
  const initializeState: Event = {
    _id: '',
    createdBy: '',
    eventName: '',
    eventDescription: '',
    eventDate: {
      startDate: '',
      endDate: '',
    },
    isEventFree: false,
    eventCost: '0',
    eventCapacity: '',
    eventCategory: '',
    eventLocation: {
      address: '',
      city: '',
      zipcode: '',
      state: '',
    },
    eventImage: null,
  };

  const [formData, setFormData] = useState(initializeState);

  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    // Fetch event details based on eventId when the component mounts
    fetchEventById('http://localhost:3000/events/', eventId??'')
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  // Function to validate US zip codes
  const validateZipCode = (zipCode: string) => {
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  };
  // handle on change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement; 
    const { name, value, type, checked } = target;

    // Validate numeric input for number fields
    if ((name === 'eventCapacity' || name === 'eventCost') && value !== '') {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // handle on location change
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'zipcode' && !validateZipCode(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['eventLocation.zipcode']: 'Invalid zip code format',
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, ['eventLocation.zipcode']: '' }));
    }

    setFormData((prevData) => ({
      ...prevData,
      eventLocation: {
        ...prevData.eventLocation,
        [name]: value,
      },
    }));
  };

  // handle on date change
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      eventDate: {
        ...prevData.eventDate,
        [name]: value,
      },
    }));
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      eventImage: file,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // handle on submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate start date and end date
    if (new Date(formData.eventDate.startDate) >= new Date(formData.eventDate.endDate)) {
      setFormErrors({ ...formErrors, eventEndDate: 'End date must be greater than start date' });
      return;
    }
    // update event
    UpdateEventById('http://localhost:3000/events/', eventId??'', formData).then((data) => {
      console.log('Event Updated Successfully');
    });

    // Reset form errors
    setFormErrors({});
    navigate('/events-organized');
  };

  return (
    <Container style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit your event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                error={!!formErrors.eventName}
                helperText={formErrors.eventName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                required
                error={!!formErrors.eventDescription}
                helperText={formErrors.eventDescription}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Start Date"
                name="startDate"
                value={formData.eventDate.startDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                required
                error={!!formErrors['eventDate.startDate']}
                helperText={formErrors['eventDate.startDate']}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Date"
                name="endDate"
                value={formData.eventDate.endDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                required
                error={!!formErrors['eventDate.endDate']}
                helperText={formErrors['eventDate.endDate']}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                label="Event Capacity"
                name="eventCapacity"
                value={formData.eventCapacity}
                onChange={handleChange}
                required
                error={!!formErrors.eventCapacity}
                helperText={formErrors.eventCapacity}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="eventCategory-label">Event Category</InputLabel>
                <Select
                  labelId="eventCategory-label"
                  id="eventCategory"
                  name="eventCategory"
                  value={formData.eventCategory}
                  onChange={handleSelectChange}
                  required
                  error={!!formErrors.eventCategory}
                >
                  <MenuItem value="Music">Music</MenuItem>
                  <MenuItem value="Party">Party</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
                {formErrors.eventCategory && (
                  <FormHelperText error>{formErrors.eventCategory}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isEventFree"
                    checked={formData.isEventFree}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="My event is free"
              />
            </Grid>
            {!formData.isEventFree && (
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Event Cost"
                  name="eventCost"
                  type="text"
                  value={formData.eventCost}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  required
                  error={!!formErrors.eventCost}
                  helperText={formErrors.eventCost}
                  autoComplete="off"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.eventLocation.address}
                onChange={handleLocationChange}
                required
                error={!!formErrors['location.address']}
                helperText={formErrors['location.address']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.eventLocation.city}
                onChange={handleLocationChange}
                required
                error={!!formErrors['location.city']}
                helperText={formErrors['location.city']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zipcode"
                name="zipcode"
                value={formData.eventLocation.zipcode}
                onChange={handleLocationChange}
                required
                error={!!formErrors['location.zipcode']}
                helperText={formErrors['location.zipcode']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.eventLocation.state}
                onChange={handleLocationChange}
                required
                error={!!formErrors['location.state']}
                helperText={formErrors['location.state']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Upload Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;
