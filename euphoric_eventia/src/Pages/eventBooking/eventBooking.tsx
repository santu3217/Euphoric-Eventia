import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost.tsx';
import TicketBookingSection from './ticketBooking.tsx';
import { useParams } from 'react-router-dom';
import { fetchEventById, DateFormatter } from '../../components/helpers.tsx';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import {Event} from '../../components/eventTypes.ts';
import {useTranslation} from 'react-i18next';

// Define the type for the "event" prop
interface EventCardProps {
  eventData: Event;
  dispatch: Dispatch<any>;
}

const BookNowSection: React.FC<EventCardProps> = (props) => {
  const {t} = useTranslation()
  const { eventData } = props;
  // const dispatch = useDispatch();
  const [showTicketBooking, setShowTicketBooking] = useState(false);

  const handleBuyTicketsClick = () => {
    setShowTicketBooking(!showTicketBooking);
  };

  return (
    <Grid item xs={12} md={12} lg={3} style={{ textAlign: 'center', position: "relative", left: "350px", top: "-510px" }}>
      <div>
        <h2>{t("Book Now")}</h2>
        <Button variant="contained" onClick={handleBuyTicketsClick} style={{ backgroundColor: "#e7005e" }}>
          {t("Buy Tickets")}
        </Button>
      </div>
      {showTicketBooking && eventData && <TicketBookingSection eventData={eventData} />}
    </Grid>
  );
};

const defaultTheme = createTheme();

const EventBooking: React.FC = () => {
  const {t} = useTranslation()
  const mainFeaturedPostStyle = {
    paddingTop: '60px',
  };

  const aboutStyle = {
    padding: '20px',
    backgroundColor: '#d0d0cf',
    borderRadius: "10px",
    fontFamily: "Book Antiqua",
    marginBottom: "30px"
  };

  const { eventId } = useParams();
  const dispatch = useDispatch(); 

  const initializeState = {
    _id: '', // Add the necessary properties with default values
    createdBy: '', // Assuming createdBy is a string property
    eventName: '',
    eventDescription: '',
    eventDate: {
      startDate: '',
      endDate: ''
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
    eventImage: {
      imageName: '',
      fileName: '',
      imagePath: ''
    },
  };

  const [eventData, setEventData] = useState(initializeState);
  const [loadedImage, setLoadedImage] = useState('');

  useEffect(() => {
    fetchEventById('http://localhost:3000/events/', eventId??"")
      .then((data) => {
        setEventData(data);
        dispatch({ type: 'SET_EVENT_DATA', payload: data });

        import(`../../images/eventThumbnails/${data.eventImage.fileName}`)
          .then((module) => module.default)
          .then((image) => {
            setLoadedImage(image);
          })
          .catch((error) => {
            console.error(`Error importing image ${data.eventImage.fileName}:`, error);
          });
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  const startDate = DateFormatter(eventData.eventDate.startDate);
  const endDate = DateFormatter(eventData.eventDate.endDate);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "55px" }}>
        <main>
          <div style={mainFeaturedPostStyle}>
            <MainFeaturedPost eventName={eventData.eventName} startDate={startDate} image={loadedImage} />
          </div>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <div style={aboutStyle}>
                <h2 style={{ fontFamily: "Book Antiqua" }}>{t("About")}</h2>
                <p>{eventData.eventDescription}</p>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={7}>
              <CardActionArea>
                <Card sx={{ display: 'flex', height: "140px", zIndex: "1000" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h4" style={{ fontFamily: "Book Antiqua" }}>
                      {t("Location")}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontSize: "15px", whiteSpace: 'pre-line', lineHeight: '1.2', marginTop: '10px', fontFamily: "Book Antiqua" }}>
                      {eventData.eventLocation.address}
                      <br />
                      {eventData.eventLocation.city}, {eventData.eventLocation.state}
                      <br />
                      {eventData.eventLocation.zipcode}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                    image={loadedImage}
                    alt="Event Image"
                  />
                </Card>
              </CardActionArea>
            </Grid>
            <Grid item xs={7}>
              <CardActionArea>
                <Card sx={{ display: 'flex', height: "140px" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h4" style={{ fontFamily: "Book Antiqua" }}>
                      {t("Price")}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontSize: "35px", lineHeight: '1.2', marginTop: '20px', fontFamily: "Book Antiqua" }}>
                      {eventData.isEventFree ? 'Free' : `$ ${eventData.eventCost}`}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                    image={loadedImage}
                    alt="Event Image"
                  />
                </Card>
              </CardActionArea>
            </Grid>
            <Grid item xs={7}>
              <CardActionArea>
                <Card sx={{ display: 'flex', height: "140px" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h4" style={{ fontFamily: "Book Antiqua" }}>
                      {t("Date and time")}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontSize: "17px", whiteSpace: 'pre-line', lineHeight: '1.2', marginTop: '10px', fontFamily: "Book Antiqua" }}>
                      {t("starts")} @ {startDate}
                      <br />
                      {t("ends")} @ {endDate}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
                    image={loadedImage}
                    alt="Event Image"
                  />
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
          <BookNowSection eventData={eventData} dispatch={dispatch}/>
          
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default EventBooking;
