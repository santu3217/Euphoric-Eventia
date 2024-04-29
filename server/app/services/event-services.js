// Importing the Event model for database operations.
import Event from '../models/eventDetails.js';

// Function to search for events based on provided parameters.
export const search = async (params = {}) => {
    // Using Event.find() to search for events matching the given params.
    // The exec() function is used to execute the query.
    const events = await Event.find(params).exec();
    return events; // Returning the found events.
}

// Function to save a new event to the database.
export const save = async (request) => {
    // Extracting event data from the request body.
    const newEvent = {...request.body};

    // Extracting uploaded image data from the request.
    const image = request.file;

    // Adding image details to the newEvent object.
    newEvent.eventImage = {
        imageName: image.originalname, 
        fileName: image.filename, 
        imagePath: image.path
    };

    // Parsing JSON fields if necessary.
    newEvent.eventDate = JSON.parse(newEvent.eventDate);
    newEvent.eventLocation = JSON.parse(newEvent.eventLocation);

    // Creating a new Event document with the provided data.
    const event = new Event(newEvent);

    // Saving the new event to the database and returning the result.
    return await event.save();
}

// Function to update an existing event.
export const update = async (eventId, request) => {
    // Extracting data to be updated from the request body.
    const updateData = request.body;

    // Updating the event identified by eventId with the new data.
    // Option { new: true } returns the updated document.
    const event = await Event.findByIdAndUpdate(eventId, updateData, { new: true }).exec();
    return event; // Returning the updated event.
};

// Function to remove an event by its ID.
export const remove = async (eventId) => {
    // Deleting the event identified by eventId.
    const event = await Event.findByIdAndDelete(eventId).exec();
    return event; // Returning the deleted event.
};

// Function to search for an event by its ID.
export const searchEventById = async (eventId) => {
    // Finding the event by its ID.
    const event = await Event.findById(eventId);
    return event; // Returning the found event.
}
