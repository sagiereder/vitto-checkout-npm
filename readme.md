## **Vitto Checkout**

This package allows Vitto customers to implement Vitto Checkout on any react app.



## The Checkout Component

Checkout accepts the following:

data: {

    items: [
        {
          item: "string", //The name of the item
          price: number,
          quantity: number,
          total: number
         },
     ...
    ],
    shipping: number //cost of shipping if applicable
    requireAddress: boolean //collect shipping address?
},

//pass an empty object for userData and checkout will collect the information for you.

userData: {

    firstName: "string",
    lastName: "string",
    email: "string"
},

onSuccess: function, //function that goes off after checkout finishes.

id: "string" //your unique vitto checkout id identifies you.