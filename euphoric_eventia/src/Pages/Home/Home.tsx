import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { fetchEventsData } from '../../components/helpers.tsx';
import { debounce } from 'lodash';
import EventSearch from './EventSearch/EventSearch.tsx';
import {Highlights} from './Highlights/highlights.tsx';
import { FilterEvents } from './FilterEvents/FilterEvents.tsx';
import Events from './Events/Events.tsx';
import {Event} from '../../components/eventTypes.tsx'

const initialState: Event[] = [];

const StyledContainer = styled.div`
  margin: 0px;
  background-color: '#f4f7fa';
`;

export function Home() {
  const targetElementRef = useRef(null);

  const [eventList, setEvents] = useState<Event[]>(initialState);
  const [filter, setFilter] = useState<{ name: string; value: string }>({ name: '', value: '' });

  useEffect(() => {
    fetchEventsData('http://localhost:3000/events/')
      .then((data: Event[]) => {
        console.log('Fetched data Successfully');
        setEvents(data);
      })
      .catch((error) => {
        console.log('Error while fetching data');
        setEvents([]);
      });
  }, []);

  const searchHandler = (query: string) => {
    if (targetElementRef.current && query) {
      (targetElementRef.current as any).scrollIntoView({ behavior: 'smooth' });
    }

    setFilter({ name: '', value: query });
  };

  const filteredData = useMemo(() => {
    switch (filter.name) {
      case 'eventName':
        return eventList.filter((e) => e.eventName.toLowerCase().includes(filter.value.toLowerCase()));
      case 'eventCategory':
        return eventList.filter((e) => e.eventCategory.toLowerCase().includes(filter.value.toLowerCase()));
    }

    return eventList.filter((e) => e.eventName.toLowerCase().includes(filter.value.toLowerCase()));
  }, [eventList, filter]);

  const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 300), [searchHandler]) as (query: string) => void;

  return (
    <StyledContainer>
      <EventSearch onSearch={debouncedSearchHandler} />
      <Highlights />
      <FilterEvents onSearch={(data) => debouncedSearchHandler(data.value)} />
      <Events eventData={filteredData} targetRef={targetElementRef} />
    </StyledContainer>
  );
}
