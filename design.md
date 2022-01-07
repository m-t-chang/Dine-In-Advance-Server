# Requirements

Requirements

-   Customer
    -   provides info during reservation:
        -   name
        -   mobile number
        -   timeslot
        -   number of people
    -   view their current reservations
    -   edit/delete their own reservations
-   system allows only a limited number of reservations per timeslot
-   no need for purchase to make reservation
-   Manager
    -   view current reservations
    -   edit/delete existing reservation
-   Notifications
    -   confirmation message to Customer and Manager after completing reservation
-   Multiple users and managers
-   Multiple venues/restaurants
-   Ability to embed into 3rd party website via iFrame (namely Weebly)

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
