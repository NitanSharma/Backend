const express = require("express");
const app = express();
const users = require("./routes/user.js"); // router object
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

// app.use(cookieParser());
// for signed cookies
app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req,res) =>{
    res.cookie("made-in", "India", {signed : true});
    res.send("signed cookie sent");
})

app.get("/verify", (req, res) =>{
    console.log(req.signedCookies);
    res.send("verified");
})
// Sending Cookies
app.get("/getcookies", (req,res) => {
    res.cookie("greet" , "hello");// in cookie method we pass name value pair
    res.cookie("madeIn" , "India");
    res.send("send you some cookies!");
})
// Cookie Parser : when using cookie-parser middleware this property is an object that contains cookies sent by the request.
// if the request contain no cookies, it default {},
// it is npm package

app.get("/greet", (req,res) => {
    let {name= "anonymous"} = req.cookies;
    res.send(`Hi , ${name}`);
})

app.get("/" , (req,res) => {
    console.dir(req.cookies);
    res.send("Hi, I am root");
})

app.use("/users", users); // use for matching path /users 
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Server is listening to 3000");
})

/* Express Router : Express Routers are a way to organize your Express application such that our primary app.js file
does not become bloated.

const router = express.Router()  --: creates new router object
*/