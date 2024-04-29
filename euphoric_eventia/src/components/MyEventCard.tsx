import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import { deleteEventById, DateFormatter } from '../components/helpers.tsx';
import { useNavigate } from 'react-router-dom';
import {Event} from '../components/eventTypes.ts';

interface MyCardProps {
  event: Event;
  onUpdateEventList: () => void;
}

const cardStyle: React.CSSProperties = {
  maxWidth: 345,
  height: 500,
};

const MyCard: React.FC<MyCardProps> = ({ event, onUpdateEventList }) => {
  const navigate = useNavigate();
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  // delete the event by ID
  const deleteEvent = async (eventId: string) => {
    try {
      await deleteEventById("http://localhost:3000/events/", eventId);
      console.log("Event Deleted");
      onUpdateEventList();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // redirect to edit event
  const editEvent = (eventId: string) => {
    navigate(`/edit-event/${eventId}`);
  };

  // redirect to event Booking
  const handleEvent = (eventId: string) => {
    navigate(`/event-booking/${eventId}`);
  };

  // Fetching thumbnail images
  useEffect(() => {
    if (event.eventImage && typeof event.eventImage !== 'string' && !(event.eventImage instanceof File) && 'fileName' in event.eventImage) {
      import(`../images/eventThumbnails/${event.eventImage.fileName}`)
        .then((module) => module.default)
        .then((image) => {
          setLoadedImage(image);
        })
        .catch((error) => {
          console.error(`Error importing image:`, error);
        });
    }
  }, [event.eventImage]);

  // styling for twoLinesEllipsisStyle
  const twoLinesEllipsisStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    lineHeight: '1.4rem', // Adjust the line height as needed
  };

  return (
    <Card id={event._id} style={cardStyle}>
      <div style={{ position: 'relative' }} onClick={() => handleEvent(event._id)}>
        <CardMedia component="img" height="194" src={loadedImage ?? ''} alt="Event" />
      </div>
      <CardContent onClick={() => handleEvent(event._id)}>
        <Typography gutterBottom variant="h5" component="div">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={twoLinesEllipsisStyle}>
          {event.eventDescription}
        </Typography>
        <br />
        <Typography color="text.secondary">
          {DateFormatter(event.eventDate.startDate)}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton
        aria-label="delete"
        sx={{ '&:hover': { color: 'red' } }}
        component="div"
      >
        <DeleteIcon onClick={() => deleteEvent(event._id)} />
      </IconButton>
      <IconButton
        aria-label="delete"
        sx={{ '&:hover': { color: 'red' } }}
        component="div"
      >
        <EditIcon onClick={() => editEvent(event._id)} />
      </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
