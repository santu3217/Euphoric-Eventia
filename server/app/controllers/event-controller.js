// Importing the eventService module that contains functions for interacting with the database
import * as eventService from '../services/event-services.js';
// Importing utility functions for setting standard HTTP responses
import {
    setResponse,
    setErrorResponse
} from '../../helper/response-handler.js'

// Controller function for handling GET requests
export const find = async (request, response) => {
    try {
        const params = {
            ...request.query
        };
        const events = await eventService.search(params);
        setResponse(events, response)
    } catch (error) {
        console.log(error)
        setErrorResponse(error, response)
    }
}

// Controller function for handling POST requests
export const post = async (request, response) => {
    try {
        const event = await eventService.save(request);
        setResponse(event, response)
    } catch (error) {
        setErrorResponse(error, response)
    }
}

// Controller function for handling PUT requests
export const update = async (request, response) => {
    try {
        const updatedEvent = await eventService.update(request.params.eventId, request);
        setResponse(updatedEvent, response)
    } catch (e) {
        response.status(400).send(e.message);
    }
};

// Controller function for handling DELETE requests
export const remove = async (request, response) => {
    try {
        const event = await eventService.remove(request.params.eventId);
        setResponse(event, response)
    } catch (e) {
        response.status(400).send(e.message);
    }
};


export const findById = async (request, response) => {
    try {
        const event = await eventService.searchEventById(request.params.eventId);
        setResponse(event, response)
    } catch (e) {
        response.status(400).send(e.message);
    }
}
