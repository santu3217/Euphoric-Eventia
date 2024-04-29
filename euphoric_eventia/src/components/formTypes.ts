export interface Form {
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    country: string
  }

  export interface Payment{
    cardName: string,
    cardNumber: string,
    expDate: Date,
    cvv: string
  }

  export interface ReviewProps {
    formData: Form & Payment; // Combine Form and Payment interfaces
    eventData: Event;
  }