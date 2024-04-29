// Importing the necessary modules.
import express from 'express';
import initialize from './app/app.js';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

// Creating an Express application.
const app = express();

// Using bodyParser to parse JSON payloads in incoming requests.
app.use(bodyParser.json());

// Creating a transporter for nodemailer with Mailjet SMTP server configuration.
const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: '72133672d1367c433ed72341811b78bd', // Mailjet username (API key)
        pass: 'c068b56cb120200b6303338cc58636df'  // Mailjet password (API secret)
    }
});

// Defining a POST route to handle email sending.
app.post('/send-email', (req, res) => {
    // Extracting email details from the request body.
    const { to, subject, text } = req.body;

    // Setting up email options.
    const mailOptions = {
        from: 'satyam.jagtap1@gmail.com', // Sender's email address
        to, // Recipient's email address
        subject, // Subject of the email
        text // Body of the email
    };

    // Sending the email using the transporter.
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // If there is an error, send a 500 response with the error message.
            res.status(500).send(error.toString());
        } else {
            // On success, send a response with the success message.
            res.send('Email sent: ' + info.response);
        }
    });
});

// Defining the port number to listen on.
const port = 3000;

// Initializing the application with any additional settings or routes.
initialize(app);

// Starting the server and listening on the specified port.
app.listen(port, () => console.log(`Server is listening at port ${port}`));
