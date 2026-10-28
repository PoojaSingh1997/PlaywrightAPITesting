import{test,expect} from "@playwright/test"

test("Put Example", async function ({request}) 
{

    const authdata={
    "username" : "admin",
    "password" : "password123"
}

    const response=await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-type":"application/json"},data:authdata})

    const jsonresp=await response.json()

    const authtoken=jsonresp.token

    console.log("Token is "+authtoken);

    const newbookingdata={
    "firstname" : "Pooja",
    "lastname" : "Singh",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-01-01",
        "checkout" : "2026-02-02"
    },
    "additionalneeds" : "Breakfast"
}
    const newbookingresponse= await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{"Content-Type":"application/json"},data:newbookingdata})

    const newbookingresponsejson=await newbookingresponse.json()

    console.log(newbookingresponsejson);

    const bookingID=newbookingresponsejson.bookingId

    console.log("New Booking ID is "+bookingID);

    const updatedbookingdata=
    {
    "firstname" : "Pooja",
    "lastname" : "Singh",
    "totalprice" : 200,
    "depositpaid" : false,
    "bookingdates" : {
        "checkin" : "2026-03-01",
        "checkout" : "2026-04-02"
    },
    "additionalneeds" : "Dinner"
}

    const updatedresponse= await request.put("https://restful-booker.herokuapp.com/booking/1"+bookingID,

        {headers:{"Content-Type":"application/json", "Accept":"application/json", "Cookie":"token="+authtoken}, data:updatedbookingdata})

        const updatedresponsejson=await updatedresponse.json()

        console.log(updatedresponsejson);

})