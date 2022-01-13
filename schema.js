const restaurants = [
    {
        restaurantName: "chang & chin",
        address: "123 blah blah",
        operatingHours: {
            sunday: [14, 15, 16, 17, 18, 19, 20],
            monday: [14, 15, 16, 17, 18, 19, 20],
        },
        tables: [{ tableNumber: 12, maxGroupSize: 6 }],
        bookings: [
            {
                _id: "res_1234",
                tableNumber: 12,
                customerInfo: {
                    name: "blah",
                    email: "blah@chicken.com",
                    contactNo: "12345",
                },
                groupSize: 5,
                specialRequests: "sometext",
                hoursBooked: [14, 15],
                deletedFlag: false,
            }, // edits are basically delete and new
        ],

        tables: [
            {
                tableNumber: 12,
                maxGroupSize: 6, // issue if size changes?
                Bookings: [
                    {
                        _id: "res_1234",
                        customerInfo: {
                            name: "blah",
                            email: "blah@chicken.com",
                            contactNo: "12345",
                        },
                        groupSize: 5,
                        specialRequests: "sometext",
                        hoursBooked: [14, 15],
                        deletedFlag: false,
                    }, // edits are basically delete and new
                ],
            },
        ],
    },
];

// pseudocode for timings dropdown
/*
get restaurant ID
get group Size 
    filter away tables that don't have that size
check Availability
    Define a object with max possible availabilities
        1200: 5
        1300: 5
        1400: 5
    NESTED FOR LOOP
        For each hour (1200)
            Do a Mongo.find() to get the reservations for that hour
            For each table
                Do a Mongo.find() to get the reservations for that table
                If that table is available at that hour, then minus the output variable

                */
