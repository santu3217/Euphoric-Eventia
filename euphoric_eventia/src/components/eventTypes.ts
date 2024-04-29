// eventTypes.ts

export interface EventImage {
    imageName: string;
    fileName: string;
    imagePath: string;
  }
  
  export interface EventLocation {
    address: string;
    city: string;
    zipcode: string;
    state: string;
  }
  
  export interface EventDate {
    startDate: string;
    endDate: string;
  }
  
  export interface Event {
    _id: string;
    eventName: string;
    eventDescription: string;
    eventCategory: string;
    isEventFree: boolean;
    eventCost: string;
    eventCapacity: string;
    eventDate: EventDate;
    eventLocation: EventLocation;
    eventImage: EventImage | null | undefined | string | File;
    createdBy: string;
  }
  

  export interface EventRef {
    _id: string;
    eventName: string;
    eventDescription: string;
    eventCategory: string;
    isEventFree: boolean;
    eventCost: string;
    eventCapacity: string;
    eventDate: EventDate;
    location: EventLocation;
    eventImage: EventImage | null | undefined | string | File;
    createdBy: string;
  }