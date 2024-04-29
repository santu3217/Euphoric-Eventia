import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import MyEventCard from "../../components/MyEventCard.tsx";
import styled from "@emotion/styled";
import { fetchEventsData } from '../../components/helpers.tsx';
import {Event} from '../../components/eventTypes.ts';
import {useTranslation} from "react-i18next";
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled('h1')({
  'font-size': "60px",
  'padding-top': "100px",
  'color': '#1c173b',
  'text-shadow': '7px 7px 8px rgb(231,0,94,0.3)'
});

const styles = {
  container: {
      'display': 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      'text-align': 'center',
  },
  noEventsStyle: {
    'text-align': 'center',
    'margin-top': '30px',
    'font-size': '35px',
    'font-weight': 'bold',
    'color': '#333',
  },
  button: {
      'margin-top': '20px',
      'padding': '10px 20px',
      'font-size': '18px',
      'color': '#fff',
      'background-color': '#007bff',
      'border': 'none',
      'border-radius': '5px',
      'cursor': 'pointer',
  }
};


const Events: React.FC = () => {
  const {t}=useTranslation()
  const [eventList, setEvents] = useState<Event[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userEmail')){
      navigate('/login')
    }
  }, [])

  const organizeEvent = () => {
    navigate('/create-event')
  }

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('userEmail');
      setUserEmail(email || '');

      if (email) {
        try {
          const data: Event[] = await fetchEventsData(`http://localhost:3000/events?createdBy=${email}`);
          console.log("Fetched data Successfully");
          setEvents(data);
        } catch (error) {
          console.error("Error while fetching data", error);
          setEvents([]);
        }
      } else {
        console.log("No userEmail found");
      }
    };

    fetchData();
  }, []);

  const handleUpdateEventList = () => {
    // Fetch updated event list after deletion
    fetchEventsData(`http://localhost:3000/events?createdBy=${userEmail}`)
      .then(data => {
        console.log("Fetched data successfully after deletion");
        setEvents(data);
      })
      .catch(error => {
        console.log("Error while fetching data after deletion");
        setEvents([]);
      });
  };

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StyledHeader>{t("Organized Events")}</StyledHeader>
      {eventList.length > 0 ? (
        <Grid container spacing={3}>
          {eventList.map(event => (
            <Grid item xs={4} sm={3} key={event._id}> 
              <MyEventCard event={event} onUpdateEventList={handleUpdateEventList} />
            </Grid>
        ))}
      </Grid>
    ) : (
      <div style={styles.container}>
        <p style={styles.noEventsStyle}>{t("You haven't organized any 'Events' yet..")}</p>
        <button style={styles.button} onClick={organizeEvent}>Create Event</button>
      </div>
    )}
    </Container>
  );
}

export default Events;
