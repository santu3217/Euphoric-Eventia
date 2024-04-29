import React, { FC } from "react";
import { Container, Grid } from "@mui/material";
import EventCard from "../../../components/EventCard.tsx";
import styled from "@emotion/styled";
import {Event} from '../../../components/eventTypes.ts';
import {useTranslation} from 'react-i18next';

// initializing data type
interface EventsProps {
  eventData: Event[];
  targetRef: React.RefObject<HTMLElement>;
  component?: React.ElementType; // Add component prop
}

// styled component for header
const StyledHeader = styled("h1")({
  fontSize: "60px",
  paddingTop: "100px",
  color: "#1c173b",
});

const Events: FC<EventsProps> = ({ eventData, targetRef, component = "div" }) => {
  // initializing translation
  const {t} =useTranslation()
  console.log(t('This is translated'), 'This is translated')
  return (
    <Container component={component} ref={targetRef}>
      <StyledHeader>{t("Find Your Next Event")}</StyledHeader>
      <Grid container spacing={3}>
        {eventData.map((event) => (
          <Grid item xs={12} sm={3} key={event._id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events;
