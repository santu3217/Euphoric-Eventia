# Event Management System: Euphoric Eventia


## What is Euphoric Eventia ?
Euphoric Eventia is an event management website designed to simplify the process of creating, discovering, and managing eventsEvent organizers and attendees can list, register, and promote events on it. The website hosts music performances, cuisine festivals, health clinics, and parties. Users may stay connected and informed about events they're interested in with its user-friendly interface, social network integration, and real-time notifications. Euphoric Eventia promotes event community to improve everyone's experience.

## Purpose
* Discover Events: Browse selected events in music, parties, health, and food to suit your interests.
* Create Events: Give hosts a simple way to schedule events and interact with attendees 
* Customize Experiences: Use data and user choices to promote events to help users find activities they like. 
* Enhance Accessibility: A straightforward, seamless digital experience makes event administration and attendance easier.

## Features
* Event Discovery: Find events by category, date, location, or keyword using a thorough search option. 
* Custom Event Creation: An easy-to-use interface for creating and customizing events, ticket prices, and venues. 
* Ticketing and Registration: Event-goers can easily purchase and register with a built-in ticketing system. 
* Real-time notifications: Automated reminders for forthcoming events, ticket sales milestones, and other event updates. 
* User-Friendly Application: "Experience the ease of navigation with our intuitively designed platform." 
* CRUD Operations for Organizers: "Empowering organizers with complete control to create, modify, and manage events effortlessly." 
* Email Notifications for Booked Events: "Stay informed with automatic email updates for every event you book." 
* Login Functionality for Users and Organizers: "Secure and personalized access for both users and organizers."




## System Overview
* EMS consists of interconnected components to simplify event management.
* Features include user management, event handling, registration, payment processing, ticket distribution, event sharing, analytics, and discounts.
* Each component is tailored to offer complete solutions for event organizers and attendees.

## Diagram Description
* The OMD depicts relationships between Users, Events, Organizers, and Customers.
* Users can create and manage Events, and Customers can register and attend these Events.
* Relationships within the OMD are defined with specific cardinalities, such as one-to-many or one-to-one, to illustrate the system's data model.

## Object Descriptions
* **User:** Represents both organizers and attendees with detailed attributes.
* **Event:** Contains all necessary details for event management and listing.
* **Organizer:** A user role dedicated to creating and managing events.
* **Customer:** Users who interact with the system to participate in events.
* **Event Registration:** Manages the process for attendees to sign up for events.
* **Payment:** Processes financial transactions with detailed auditing and user convenience.
* **Ticket:** Validates and grants access to events.
* **Event Share:** Promotes events across various channels.
* **Analytics:** Collects and analyzes user data for strategic insights.
* **Event CRUD:** Facilitates basic data management operations for events.
* **Discount:** Applies promotional offers to event pricing.

## Relationships
* Outlines the cardinality and nature of relationships between objects within the EMS.
* Examples include one-to-many relationships between Organizers and Events, and many-to-one relationships between Customers and Events.

## Usage Scenarios
* Scenarios such as event creation by Organizers, event discovery, and registration by Customers are detailed.
* Includes how Organizers can use Analytics to adapt event details based on data.

## Conclusion
* The OMD provides a structured representation of the EMS for development.
* Emphasizes the integration of all event management aspects, reflecting Eventbrite's service range.


* Serves as a conceptual framework for the development of the event management website, ensuring a seamless user experience.
  
**These are the API Resources that we would be using for the project :**
 * Eventbrite API: Provides functionalities for creating and managing events, tickets, and registrations.

* Google Calendar API: Allows integration with Google Calendar for adding, modifying, and organizing events.

* Stripe API: Facilitates secure online payments.
* PayPal API: Popular for processing payments, including event registrations.
* Twilio  API: Email and SMS

* Google Analytics API: For tracking website traffic and user interactions.
* Mixpanel API: Offers advanced analytics for user behavior tracking.

  Object model Diagram for our project!

![UML-Final Project](https://github.com/info-6150-fall-2023/final-project-dev-wizards/assets/114623083/019403ce-a9a2-4208-beeb-ce5cd049d22c)
