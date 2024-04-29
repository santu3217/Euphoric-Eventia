// Importing Express to create router handlers.
import express from "express";

// Importing all functions from the event controller.
import * as eventController from '../controllers/event-controller.js';

// Importing the upload middleware for handling file uploads.
import { upload } from '../../helper/eventThubmbail.js';

// Creating a new router instance.
const router = express.Router();

// Defining route handlers for the root path ('/') of the event.
router.route('/')
    .get(eventController.find) // GET request to find and return all events.
    .post(upload.single('eventImage'), eventController.post); // POST request to create a new event, with image upload.

// Defining route handlers for specific events using their 'eventId'.
router.route('/:eventId')
    .put(eventController.update) // PUT request to update a specific event by eventId.
    .delete(eventController.remove) // DELETE request to remove a specific event by eventId.
    .get(eventController.findById); // GET request to find a specific event by eventId.

// Exporting the router to be used in other parts of the application.
export default router;
