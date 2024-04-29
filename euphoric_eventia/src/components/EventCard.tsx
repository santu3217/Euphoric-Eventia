import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Event} from '../components/eventTypes';
import { DateFormatter } from './helpers.tsx';

interface EventCardProps {
  event: Event;
}
//style for card
const cardStyle: React.CSSProperties = {
  boxShadow: '0px 1px 8px rgb(0,0,0,0.6)',
  maxWidth: 300,
  height: 480,
  cursor: 'pointer',
};

//style for twoLinesEllipsisStyle
const twoLinesEllipsisStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  lineHeight: '1.4rem'
};

// style for EventCard
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleEvent = (eventId: string) => {
    navigate(`/event-booking/${eventId}`);
  };

  const [loadedImage, setLoadedImage] = useState<string | null>(null);
 
  // importing thumbnail images 
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

  return (
    <Card id={event._id} style={cardStyle}>
      <CardMedia
        component="img"
        height="180"
        image={loadedImage ?? ''}
        alt={event.eventName}
        onClick={() => handleEvent(event._id)}
      />
      <CardContent onClick={() => handleEvent(event._id)}>
        <Typography gutterBottom variant="h5" component="div">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={twoLinesEllipsisStyle}>
          {event.eventDescription}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          {DateFormatter(event.eventDate.startDate)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
