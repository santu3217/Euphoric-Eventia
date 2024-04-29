import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { createEvent } from '../../components/helpers.tsx';
import { useNavigate } from 'react-router-dom';
import { EventRef } from '../../components/eventTypes.tsx';
import { SelectChangeEvent } from '@mui/material';
import {useTranslation} from 'react-i18next';
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

const EventForm: React.FC = () => {
  // initialize translation
  const {t}=useTranslation()
  const navigate = useNavigate();

  // navigate to login if user not loggedin
  useEffect(() => {
    if (!localStorage.getItem('userEmail')) {
      navigate('/login');
    }
  }, []);

    // initialize the variables
  const initializeState: EventRef = {
    _id: '',
    eventName: '',
    createdBy: '',
    eventDescription: '',
    eventDate: {
      startDate: '',
      endDate: '',
    },
    isEventFree: true,
    eventCost: '0',
    eventCapacity: '',
    eventCategory: '',
    location: {
      address: '',
      city: '',
      zipcode: '',
      state: '',
    },
    eventImage: null,
  };

  const [formData, setFormData] = useState<EventRef>(initializeState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // validate the zipcode
  const validateZipCode = (zipCode: string): boolean => {
    const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  };

  // update the form on change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

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

  // update location on change
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === 'zipcode' && !validateZipCode(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['location.zipcode']: 'Invalid zip code format',
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, ['location.zipcode']: '' }));
    }

    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  // update the date change
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      eventDate: {
        ...prevData.eventDate,
        [name]: value,
      },
    }));
  };

  // handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      eventImage: file,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      eventCategory: event.target.value, // Assuming eventCategory is a string
    }));
  };

  // Handle change
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  
    if (new Date(formData.eventDate.startDate) >= new Date(formData.eventDate.endDate)) {
      setFormErrors({ ...formErrors, eventEndDate: 'End date must be greater than start date' });
      return;
    }
  
    // Appending the data to form
    const form = new FormData();
    form.append('eventName', formData.eventName);
    form.append('eventDescription', formData.eventDescription);
    form.append('eventDate', JSON.stringify(formData.eventDate));
    form.append('isEventFree', formData.isEventFree.toString());
    form.append('eventCost', formData.eventCost);
    form.append('eventCapacity', formData.eventCapacity);
    form.append('eventCategory', formData.eventCategory);
  
    // Check if eventImage is not null or undefined and is a File before appending
    if (formData.eventImage && formData.eventImage instanceof File) {
      form.append('eventImage', formData.eventImage);
    } else {
      form.append('eventImage', '');
    }
  
    form.append('eventLocation', JSON.stringify(formData.location));
    form.append('createdBy', localStorage.getItem('userEmail') || '');
  
    createEvent('http://localhost:3000/events/', form).then((data) => {
      console.log('Event Created Successfully');
    });
  
    console.log('Created Event Successfully');
  
    setFormErrors({});
    navigate('/');
  };
  
  

  return (
    <Container style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '40px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Your Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("Event Name")}
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
                label={t("Event Description")}
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                required
                error={!!formErrors.eventDescription}
                helperText={formErrors.eventDescription}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label={t("Start Date")}
                name="startDate"
                value={formData.eventDate.startDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                required
                error={!!formErrors['eventDate.startDate']}
                helperText={formErrors['eventDate.startDate']}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label={t("End Date")}
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
                label={t("Event Capacity")}
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
                <InputLabel id="eventCategory-label">{t("Event Category")}</InputLabel>
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
                label={t("My event is free")}
              />
            </Grid>
            {!formData.isEventFree && (
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label={t("Event Cost")}
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
                label={t("Address")}
                name="address"
                value={formData.location.address}
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
                label={t("City")}
                name="city"
                value={formData.location.city}
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
                label={t("Zipcode")}
                name="zipcode"
                value={formData.location.zipcode}
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
                label={t("State")}
                name="state"
                value={formData.location.state}
                onChange={handleLocationChange}
                required
                error={!!formErrors['location.state']}
                helperText={formErrors['location.state']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {t("Upload Event Thumbnail:")}
              </Typography>
              <input
                id="eventImage"
                type="file"
                name="eventImage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {t("Upload Event")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;