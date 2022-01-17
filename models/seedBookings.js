module.exports = [
    {
        customerInfo: {
            name: "Steve Jobs",
            email: "steve@apple.com",
            contactNo: "510 555 1234",
        },
        groupSize: 2,
        specialRequests: "apple pie",
        date: 1644508800, //UTC time with date. other parts are ignored. Interpreted in SG time zone
        hoursBooked: [14],
        restaurantName: "Chang & Chin",
        tableNumber: 1,
        deletedFlag: false,
    }, // edits are basically delete and new
    {
        customerInfo: {
            name: "Bill Gates",
            email: "bill@microsoft.com",
            contactNo: "510 555 6779",
        },
        groupSize: 2,
        specialRequests: "window seat",
        date: 1644508800, //UTC time with date. other parts are ignored. Interpreted in SG time zone
        hoursBooked: [15],
        restaurantName: "Chang & Chin",
        tableNumber: 1,
        deletedFlag: false,
    }, // edits are basically delete and new
];
