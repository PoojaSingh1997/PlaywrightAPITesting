import {test,expect} from "@playwright/test"

3

test("Post Call Example With Token and Booking ID", async function ({request}) 
{
    const authdata={
    "username" : "admin123",
    "password" : "password123"
}

    const response= await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata})

    console.log(response.status());

    const responseData=await response.json();

    expect(responseData.token).not.toBeNull()

})


test("Post Call Example With BookingID", async function ({request}) 
{
    const bookingData={
    "firstname" : "Pooja",
    "lastname" : "Singh",
    "totalprice" : 300,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-01-01",
        "checkout" : "2026-02-01"
    },
    "additionalneeds" : "Dinner"
}

    const response= await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"},data:bookingData})

    console.log(response.status());

    const responseData=await response.json();

    console.log(responseData);

    expect(responseData.bookingid).not.toBeNull()

    expect(responseData.booking.firstname).toBe(bookingData.firstname)


})



