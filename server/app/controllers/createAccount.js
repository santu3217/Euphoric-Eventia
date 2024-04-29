// Importing the createAccount function from the services directory.
import { createAccount } from '../services/createAccount.js';

// Importing utilities to set either success or error responses.
import { setSuccessResponse, setErrorResponse } from '../../helper/response-handler.js';

// Importing a custom error handler class.
import CustomError from '../../helper/error-handlers.js';

// Exporting an asynchronous function to handle the creation of a user account.
export const createUserAccount = async (request, response) => {
    try {
        // Destructuring and cloning the request body.
        const body = { ...request.body };

        const user = await createAccount(body);
        setSuccessResponse('Account Created Successfully!', response);
    } catch (err) {
        // Handling any errors that occur and sending an error response.
        setErrorResponse(err, response);
    }
};


// Exporting a dummy function, primarily for testing or placeholder purposes.
export const dummy = async (request, response) => {
    // Logging the request body to the console for debugging or inspection.
    console.log(request.body);

    // Sending a success response with a generic message.
    setSuccessResponse("success", response);
};
