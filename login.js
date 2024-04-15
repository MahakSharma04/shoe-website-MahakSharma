const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/login');

const db = mongoose.connection;
db.on('error', () => console.log("Error connecting to database"));
db.once('open', () => console.log("Connected to database"));

app.post("/sign-up", (req, res) => {
    const name = req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    const data = {
        name:name,
        email:email,
        password:password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
          console.log("Record inserted successfully");
    })
     return res.redirect('signup_success.html');
})

// Handle all other routes (example):
app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    return res.redirect('login.html');
})

const port = process.env.PORT || 5070; // Use a defined port or default to 5000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
