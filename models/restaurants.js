// Michael: placeholder data file until we get Mongo set up
module.exports = [
    {
        restaurantName: "Chang & Chin",
        address: "79 Anson Road, Singapore 079906",
        operatingHours: {
            sun: [0, 1, 12, 13, 14, 15, 16, 17, 18],
            mon: [12, 13, 14, 15, 16, 17, 18],
            tue: [],
            wed: [],
            thu: [12, 13, 14, 15, 16, 17, 18],
            fri: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            sat: [0, 1, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        },
        tables: [
            { tableNumber: 1, maxGroupSize: 2 },
            { tableNumber: 2, maxGroupSize: 2 },
            { tableNumber: 3, maxGroupSize: 2 },
            { tableNumber: 4, maxGroupSize: 2 },
            { tableNumber: 5, maxGroupSize: 4 },
            { tableNumber: 6, maxGroupSize: 4 },
            { tableNumber: 7, maxGroupSize: 4 },
            { tableNumber: 8, maxGroupSize: 4 },
            { tableNumber: 9, maxGroupSize: 8 },
            { tableNumber: 10, maxGroupSize: 8 },
        ],
        bookings: [
            {
                _id: "generated-by-mongo",
                tableNumber: 1,
                customerInfo: {
                    name: "Steve Jobs",
                    email: "steve@apple.com",
                    contactNo: "510 555 1234",
                },
                groupSize: 2,
                specialRequests: "apple pie",
                date: 1644508800, //UTC time with date. other parts are ignored. Interpreted in SG time zone
                hoursBooked: [14],
                deletedFlag: false,
            }, // edits are basically delete and new
        ],
    },
    {
        restaurantName: "Burnt Ends",
        address: "7 Dempsey Rd, #01-04, Singapore 249671",
        operatingHours: {
            sun: [],
            mon: [],
            tue: [18, 19, 20, 21, 22],
            wed: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            thu: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            fri: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            sat: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        },
        tables: [
            { tableNumber: 1, maxGroupSize: 2 },
            { tableNumber: 2, maxGroupSize: 2 },
            { tableNumber: 3, maxGroupSize: 2 },
            { tableNumber: 4, maxGroupSize: 2 },
            { tableNumber: 5, maxGroupSize: 4 },
            { tableNumber: 6, maxGroupSize: 4 },
            { tableNumber: 7, maxGroupSize: 4 },
            { tableNumber: 8, maxGroupSize: 4 },
            { tableNumber: 9, maxGroupSize: 8 },
            { tableNumber: 10, maxGroupSize: 8 },
        ],
        bookings: [],
    },
];
