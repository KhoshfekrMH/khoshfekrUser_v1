const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//region page("/")
app.get("/", function (req,res) {
    res.sendFile(__dirname + '/index.html');
});
//endregion

let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}
app.listen(port, function () {
    if(port === 3000) {
        console.log("server run on port 3000");
    }
});