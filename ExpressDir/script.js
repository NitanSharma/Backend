const express = require("express");
const app = express();// call function and store

// console.dir(app)
let port = 8080;
app.get("/", (req,res) =>{
    res.send("Hello Its Working....../ Main Page/ root path");
})

app.get("/hello", (req,res) => {
    res.send("This is hello router");
})

app.get("/:username/:id", (req,res) => {
    let {username , id} = req.params;
    res.send(`<h1> This is your page ${username} </h1>`);
})

// handling requests using use 
// app.use((req,res) => {
//     console.log('Request Recieved');
//     // Sending a Response
//     res.send("<h1>This is basic response<h1>")
// })

app.listen(port, () =>{// listen the request
    console.log(`app is listening on port ${port}`);
})