// Importing the authenticateUser function from the services directory.
import { authenticateUser } from '../services/authenticateUser.js';

// Importing response handler utilities to set success or error responses.
import { setSuccessResponse, setErrorResponse } from '../../helper/response-handler.js';

// Exporting an asynchronous function to handle user authentication.
export const authenticateUserCredentials = async (request, response) => {
    try {
        // Extracting the request body and cloning it to a new object.
        const body = {...request.body};

        // Attempting to authenticate the user with the provided credentials.
        const user = await authenticateUser(body);

        // If authentication is successful, send a success response.
        setSuccessResponse('Login successful!', response);
    } catch (err) {
        // If an error occurs, send an error response.
        setErrorResponse(err, response);
    }
}
