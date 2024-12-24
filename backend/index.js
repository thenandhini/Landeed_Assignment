//install express
const express = require('express');
const app = express();

//middleware

const bodyParser=require("body-parser");
app.use(bodyParser.json()); //parse into json 

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5175/", //frontend url
    methods: ["GET", "POST"],

}))

app.get("/", (req, res) => {
    res.send("Welcome to the  Landeed Assignment!");
});

// config file as per the question

const config = {
    //no of form pages 
    pages: [
        {
            page_num: "Page 1",
            questions: [
                { key: "name", label: "Name", type: "text", required: true },
                { key: "gender", label: "Gender", type: "select", options: ["M", "F", "Nonbinary"], required: true },
                { key: "age", label: "Age", type: "number", required: true },

            ],
        },

        {
            page_num: "Page 2",
            questions: [
                { key: "profession", label: "Profession", type: "select", options: ["Owner", "Agent", "Buyer", "Seller"] },
                { key: "services", label: "What services do you need?", type: "text", required: false },
            ],

        },
        //can add more number of pages incase req in future
    ]
};




// 1.The endpoint to get the config json

app.get("/config", (req, res) => {
    res.json(config); //config is converted to json string and send a configuration json as a response.

})

//2.The endpoint to receive submission data from FE 

app.post("/submit", (req, res) => {

    try {
        const formData = req.body;

        //Receiving submission with data validation 
        if (!formData || Object.keys(formData).length === 0) //object.keys() to check if the formdata has no keys, and so no data
        {
            res.send("Invalid form data");

        }
        else
            res.send("Form submitted successfully!");

    } catch (error) {
        res.send("Error occurred while form submission.");
        console.log("error during form submission");

    }
})

app.listen(2024, () => {
    console.log("Merry Christmas!. Santa Server is listening on route 2024.");

});
