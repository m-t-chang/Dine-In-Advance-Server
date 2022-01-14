# Requirements

MVP Requirements

-   focus on restaurants only (not other businesses)
-   Customer
    -   provides info during reservation:
        -   name
        -   mobile number
        -   timeslot
        -   number of people
    -   view their current reservations
        -   log in? or some alternative
        -   or just send a unique link. To a Express session? Cookie-based.
    -   edit/delete their own reservations
-   system allows only a limited number of reservations per timeslot
-   no need for purchase to make reservation

Stretch Goals

-   Manager
    -   view current reservations
    -   edit/delete existing reservation
    -   definitely need log in
-   Multiple users and managers
    -   authentication
-   Multiple restaurants
-   Ability to embed into 3rd party website via iFrame (namely Weebly)

Nice to have

-   vaccination screenshots. To take in a file. or TraceTogether API?
-   Notifications (text or SMS)
    -   confirmation message to Customer and Manager after completing reservation
-   Manager can customize the timeslots. Set up the system, i.e. define available timeslots (add timeslot)
-   top down view or layout of restaurant with tables (diagram)
-   Separate accounts for managers vs employees with diff permissions
-   "closing out reservation" - take note of how many people spent. Link to POS? Time the customer left (for duration).
-   customer Time selection is done by a better calendar instead of dropdown
-   on the confirmation page, the page will pre-populate with input data, and show an indicator whether it has been edited. User can only Confirm (make booking) if no edits were made. If edits were made, the button instead shows "Update", and the button action will reload the page.
    -   Confirmation page (can this be the same as the edit page?)
        -   cusomter to ensure accuracty of form data before final submission
        -   display the saved data (pre-populated in input fields)
        -   "confirm" button

Routes - REACT outline

-   homepage / customer book a new reservation

    -   top box to book
        -   Input fields
            -   name
            -   phone no
            -   email
        -   dropdowns (each one auto-updates the next one)
            -   which restaurant
            -   group size
            -   res day, time
            -   available tables
        -   Submit button - takes you Confirmation page
    -   bottom box to edit
        -   at bottom there's "plase enter in your key to edit or cancel reservation"

-   Success page
    -   inform that process is complete
    -   "succesful booking, here's your data"
    -   provide unique key
        -   if anythings wrog, use the key to cahnge
-   customer edit/delete reservation
    -   shows res details
    -   button
        -   confirm and make booking / update
        -   delete button

How Reservations Work in general (MVP) - "CREATE" user flow

1. customer goes to website
    - Static React page
2. pick restaurant
3. pick group size
4. pick day
5. pick time (no end time)
6. website displays available tables
7. pick tables (based on group size - at first, it's Table #)
8. make reservation
9. get unique reservation ID for lookup later

Some logic needed to deal with uncertain stay time

-   a way to learn how long customers stay by manager inputting the time they left and the system learns. Correlate to group size, other customer data, etc.

11 Jan
4:00 PM (3)
5:00 PM (10)
6:00 PM (11)

STACK (MVP)

-   Mongo

    -   Reservations
        -   FK customer
        -   FK restaurant
            -   FK manager
            -   FK timeslot
            -   FK table
        -   number of people
        -   special requests (text field)
    -   Customers
        -   name
        -   contact no
        -   email
        -   History of customers (visible to manager)
    -   Managers or Employee
        -   FK restaurant
        -   username and password
    -   Restaurants
        -   location of restaurant
        -   Timeslots
            -   START WITH PLACEHOLDER - assume customers only stay 1 hour
            -   Only 12, 1, 2
        -   Table

-   Express
    -   (CREATE) POST to input data (write a new reservation)
    -   (READ) GET to retrieve booking data and display it for the manager
    -   GET the available tiemslots for the user
    -   UPDATE for timeslots taken (remove it from available when a booking is made)
    -   DELETE - user cancel booking
    -   server.js
-   React
    -   Routes for diff pages
    1. wireframes of all pages
    2. for each page, define Components
    3. Build static sites
    4. Define States, Actions and set up Store (UI State and Actions/Reducers)
        - Redux
-   Node

VIEWS

-   manager to view all timeslots and how busy they are-
-   base level is a form

===== OLD NOTES =====

Examples

-   [https://www.kki-sweets.com/reservations/](https://www.kki-sweets.com/reservations/)
    -   this pretty much has the required basica functionality

Technical challenges:

-   multi-step form
    -   [https://blog.devgenius.io/create-a-multi-step-form-with-reactjs-322aa97a2968](https://blog.devgenius.io/create-a-multi-step-form-with-reactjs-322aa97a2968)
-   make it work in an iframe? so Weebly can embed
-   map out the logic

Logic requirements:

-   INPUTS FOR TAKING NEW RESERVATION:
    -   Number of people
        -   1-5 by default.
        -   can be edited by admin
    -   Time slots
        -   depends on people
            -   “these are the available slots for X people”
        -   calendar + time
        -   show number of slots available (this is measured in tables?)
        -   obv this can be set by admin
    -   Person details
        -   first and last name
        -   phone
        -   email
        -   confirm email
        -   Login with previous account? (optional - though would be nice as this scales)
    -   Option for special requests or notes
    -   Confirmation screen that shows all inputted info before making reservation
-   USER MANAGING RESERVATION
    -   Change Reservation
    -   Delete reservation
-   ADMIN
    -   View all reservations
    -   diner directory (view diner info)
    -   maintian diner info, like special requests
-   OTHER
    -   reminder diners of reservation
    -   waitlist option if totally booked
-   ACCEPT DEPOSIT FOR RESERVATION?
