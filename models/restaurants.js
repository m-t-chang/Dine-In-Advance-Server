// Michael: placeholder data file until we get Mongo set up
module.exports = [
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
                date: "1234", //UTC time with date. other parts are ignored
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