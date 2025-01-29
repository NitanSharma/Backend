const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use((req,res, next) => { // Middleware function in the app.use()
//     console.log("I am 1st Middleware");// Every request first it will execute and output will come and other route not work
//     //res.send("This is a middleware");
//     next(); //give control to next middlewares funcions
// })

// app.use((req,res,next) => {
//     console.log("I am 2nd Middleware");
//     return next();// return next help to not execute code after next() 
//     console.log("Hello"); // this code will not execute
// })
// This middleware execute for all request like get, post ,put , delete

// app.use((req,res, next) => {// logger - morgan
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.time , req.hostname);
//     next();
// })


app.get("/", (req,res) => {// root 
    res.send("Home Route");
});

app.use("/random" , (req,res, next) => {// Middlewares for Specific Path
    console.log("I am only for random");
    next();
})
app.get("/random", (req,res) => {
    res.send("Random Route")
})

// API Token as Query String
app.use("/api" , (req,res, next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError(401, "Access Denied");    
})

app.get("/api", (req,res) => {
    res.send("Data.....")
})

// Error Handling Middleware   Backend 7 (Errors)

app.get("/err" , (req,res) => {
    abcd =abcd;
})
app.get("/admin", (req,res) => {
    throw new ExpressError(403, "Access is Forbidden");
})

app.use((err,req,res,next) => {
    let {status=500, message} = err;
    res.status(status).send(message);
    next();
})

// 404
// app.use((req,res) => {
//     res.status(404).send("Page is not found");
// })

app.listen(8080, () => {
    console.log("App listening on port 8080");
})