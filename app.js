const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//region dataBase(mongoDB)
mongoose.connect("mongodb+srv://admin-Khoshfekr:bh890Jom4JOI5lSJ@cluster0.cjnzpcu.mongodb.net/?retryWrites=true&w=majority");

const userSchema = {
    Email: String,
    password: String
}

const User = mongoose.model("user", userSchema);
//endregion

//region page("/")
app.get("/", function (req,res) {
    res.render("index.ejs", {
        displayMode: "none"
    });
});

app.post("/", function (req,res) {
    const user1 = new User ({
        Email: req.body.emailInput,
        password: req.body.passwordInput
    });

    User.find({Email: req.body.emailInput},function (err, foundUser) {
       if(!foundUser){
           User.insertMany(user1, function (err) {
               if(err) {
                   console.log(err);
               } else {
                   console.log("User Successfully added!");
                   res.redirect("/");
               }
           });
       } else {
           console.log("user exist");
           res.redirect("/");
       }
    });

});
//endregion

//region serverAddress
let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}
app.listen(port, function () {
    if(port === 3000) {
        console.log("server run on port 3000");
    }
});
//endregion