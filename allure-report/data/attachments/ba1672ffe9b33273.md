# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: deletecall.spec.js >> Delete Example
- Location: tests\deletecall.spec.js:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 405
```

# Test source

```ts
  1  | import{test,expect} from "@playwright/test"
  2  | 
  3  | test("Delete Example", async function ({request}) 
  4  | {
  5  | 
  6  |     const authdata=
  7  | {
  8  |     "username" : "admin",
  9  |     "password" : "password123"
  10 | }
  11 | 
  12 |     const response=await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-type":"application/json"},data:authdata})
  13 | 
  14 |     const jsonresp=await response.json()
  15 | 
  16 |     const authtoken=jsonresp.token
  17 | 
  18 |     console.log("Token is "+authtoken);
  19 | 
  20 |     const newbookingdata=
  21 |     {
  22 |     "firstname" : "Pooja",
  23 |     "lastname" : "Singh",
  24 |     "totalprice" : 111,
  25 |     "depositpaid" : true,
  26 |     "bookingdates" : {
  27 |         "checkin" : "2026-01-01",
  28 |         "checkout" : "2026-02-02"
  29 |     },
  30 |     "additionalneeds" : "Breakfast"
  31 | }
  32 | 
  33 |     const newbookingresponse= await request.post("https://restful-booker.herokuapp.com/booking", {headers:{"Content-Type":"application/json"},data:newbookingdata})
  34 | 
  35 |     const newbookingresponsejson=await newbookingresponse.json()
  36 | 
  37 |     console.log(newbookingresponsejson);
  38 | 
  39 |     const bookingID=newbookingresponsejson.bookingId
  40 | 
  41 |     console.log("New Booking ID is "+bookingID);
  42 | 
  43 |     console.log("**********************");
  44 | 
  45 |     const deleteresponse=await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingID,
  46 |         {headers:{"Content-Type":"application/json","Cookie":"token="+authtoken}})
  47 | 
  48 |     console.log(await deleteresponse.status());
  49 | 
> 50 |     expect(deleteresponse.status()).toBe(201)
     |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  51 | 
  52 |     console.log(deleteresponse.statusText());
  53 | 
  54 |     expect(deleteresponse.statusText()).toBe("Created")
  55 | 
  56 |     console.log("**********************");
  57 | 
  58 |     const getresponse=await request.get("https://restful-booker.herokuapp.com/booking/"+bookingID)
  59 | 
  60 |     console.log(getresponse.status());
  61 | 
  62 |     expect(getresponse.status().toBe(401))
  63 | 
  64 |     console.log(getresponse.statusText());
  65 | 
  66 |     expect(getresponse.statusText()).toBe("Not Found")
  67 | 
  68 | 
  69 |     
  70 | })
```