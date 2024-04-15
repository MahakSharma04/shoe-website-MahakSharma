const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('./payment'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/payment');

const db = mongoose.connection;
db.on('error', () => console.log("Error connecting to database"));
db.once('open', () => console.log("Connected to database"));

app.post("/payment", (req, res) => {
    const firstName = req.body.firstName;
    const email=req.body.email;
    const address=req.body.address;
    const city=req.body.city;
    const state=req.body.state;
    const zip=req.body.zip;
    const cardName=req.body.cardName;
    const cardNumber=req.body.cardNumber;
    const expMonth=req.body.expMonth;
    const expYear=req.body.expYear;
    const cvv=req.body.cvv;


    const data = {
        firstName:firstName , 
        email:email ,
        address:address ,
        city: city,
        state: state,
        zip: zip,
        cardName: cardName, 
        cardNumber: cardNumber,
        expMonth: expMonth,
        expYear: expYear,
        cvv: cvv
    }      

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
          console.log("Record inserted successfully");
    })
     return res.redirect('payment_success.html');
})

// Handle all other routes (example):
app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    return res.redirect('payment.html');
})

const port = process.env.PORT || 3000; // Use a defined port or default to 5000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
