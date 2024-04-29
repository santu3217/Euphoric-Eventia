// Importing the event routes.
import eventRouter from './event-routes.js';

// Importing the user account routes.
import userAccountRouter from './userAccountRoutes.js'

// Exporting a function that takes the Express app as an argument.
export default (app) => {

    // Mounting the eventRouter on the '/events' path.
    // All event-related requests (e.g., /events, /events/:eventId) will be handled by eventRouter.
    app.use('/events', eventRouter)

    // Mounting the userAccountRouter on the '/accounts' path.
    // All user account-related requests (e.g., /accounts, /accounts/:accountId) will be handled by userAccountRouter.
    app.use('/accounts', userAccountRouter)
}
