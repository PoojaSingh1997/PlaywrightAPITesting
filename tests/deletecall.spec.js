import{test,expect} from "@playwright/test"

test("Delete Example", async function ({request}) 
{

    const authdata=
{
    "username" : "admin",
    "password" : "password123"
}

    const response=await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-type":"application/json"},data:authdata})

    const jsonresp=await response.json()

    const authtoken=jsonresp.token

    console.log("Token is "+authtoken);

    const newbookingdata=
    {
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

    const newbookingresponse= await request.post("https://restful-booker.herokuapp.com/booking", {headers:{"Content-Type":"application/json"},data:newbookingdata})

    const newbookingresponsejson=await newbookingresponse.json()

    console.log(newbookingresponsejson);

    const bookingID=newbookingresponsejson.bookingId

    console.log("New Booking ID is "+bookingID);

    console.log("**********************");

    const deleteresponse=await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingID,
        {headers:{"Content-Type":"application/json","Cookie":"token="+authtoken}})

    console.log(await deleteresponse.status());

    expect(deleteresponse.status()).toBe(201)

    console.log(deleteresponse.statusText());

    expect(deleteresponse.statusText()).toBe("Created")

    console.log("**********************");

    const getresponse=await request.get("https://restful-booker.herokuapp.com/booking/"+bookingID)

    console.log(getresponse.status());

    expect(getresponse.status().toBe(401))

    console.log(getresponse.statusText());

    expect(getresponse.statusText()).toBe("Not Found")
    
    
})