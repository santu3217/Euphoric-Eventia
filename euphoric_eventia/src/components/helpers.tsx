// Get request to fetch the events
export async function fetchEventsData(apiUrl: string): Promise<any> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Post request to create event
export async function createEvent(apiUrl: string, data: any): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Event Created Successfully", responseData);
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

// Post request to delete event
export async function deleteEventById(apiUrl: string, eventID: string): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/${eventID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Event Deleted Successfully", responseData);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}


// Post request to update event
export async function UpdateEventById(apiUrl: string, eventID: string, data: any): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/${eventID}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Event Updated Successfully", responseData);
  } catch (error) {
    console.error('Error Updating data:', error);
    throw error;
  }
}


// Post request to fetch event by id
export async function fetchEventById(apiUrl: string, eventID: string): Promise<any> {
  try {
    const response = await fetch(`${apiUrl}/${eventID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// dateformattor
export function DateFormatter(dateString: string): string {
  try {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date string:', dateString);
      return String(dateString);
    }

    const formattedDate = dateObject.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // Replace "at" with "|"
    const replacedDate = formattedDate.replace('at', '|');

    return replacedDate;
  } catch (error) {
    console.error('Error:', error);
    return `Error: ${error.message}`;
  }
}
