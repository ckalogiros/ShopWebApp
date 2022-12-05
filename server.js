const express = require("express");
const app = express();


app.use(express.static("public"));
app.use(express.json());



/**
 * Simple Routing post request
 */
//  app.post('/api', (req, res) =>{
//     console.log("HELLO FROM SERVER!!!");
//     // console.log(req);
//     // console.log(res);

//     res.json({
//         msg: 'Server Responded!'
//     });
// })


// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51M8qJYFdBA4TpVdiiqKDPZzu4diy8Co9Q4sJPrh7uyo5frac1lQU5DkJXnvCDdsP6FYHZeo2l0YdyQwKPlksU3oG00deMwxaEZ');


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

app.post("/api", async (req, res) => {
    const { items } = req.body;
    console.log('=====================================================');
    console.log('items', items);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    // console.log('result', res);
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));