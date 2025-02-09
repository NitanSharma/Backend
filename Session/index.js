const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path")

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(session({secret : "mysupersecretstring" , resave : false , saveUninitialized : true}));
  const sessionOptions = {
    secret : "mysupersecretstring" ,
    resave : false ,
    saveUninitialized : true
   }
app.use(session(sessionOptions));
app.use(flash());// using flash

app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");// we use this by middleware
    res.locals.errorMsg = req.flash("error");
    next()
})


// Storing and using session info  : Session is use for storing single info in session and we use this info in different page or route
app.get("/register" , (req,res) => {
    let {name = "anonymous"} = req.query;
    // console.log(req.session);
    req.session.name = name; // storing info into the session object
    console.log(req.session.name);
    // res.send(name);

    if(name === "anonymous"){
        req.flash("error" , "user not register")
    }else{
        req.flash("success", "user registered successfully!");// key : message pair
    }
    res.redirect("/hello");
})
app.get("/hello" , (req,res) => {
    // console.log(req.flash("success"));
    // Using res.locals
    // storing in local variable value of flash
    // res.locals.successMsg = req.flash("success");// we use this by middleware
    // res.locals.errorMsg = req.flash("error");
    res.render("page.ejs" , {name : req.session.name})
    // res.render("page.ejs", {name : req.session.name , msg : req.flash("success")});
    // res.send(`hello , ${req.session.name}`);// accessing the info in same session
})


// app.get("/reqcount" , (req,res) => {
//     if(req.session.count){// it track the how many request is going in one particular session
//         req.session.count++;
//     }else{
//         req.session.count =1;
//     }
//     res.send(`You send a request ${req.session.count} times`);
// })
// app.get("/test" , (req,res) => {
//     res.send("test successful!");
// })


// connect-flash : npm package use of pop up messeage
// flash is a special area of the session used for storing message
// Flash messages are stored in the session 


app.get("/", (req,res) => {
    res.send("Its working");
})
app.listen(3000, () => {
    console.log("app is listening on port 3000");
})