const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public" )));
app.use(express.urlencoded({extended : true}));// parseing data from post request
app.use(methodOverride("_method"));

main().then(() => {
    console.log("Connection Successfully");
}).catch((err) => {
    console.log(err);
})

async function  main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route
app.get("/chats" , async (req,res) => {
    let chats = await Chat.find();// Chat.find() this take time to give data from database so we have to use await and async it promise
    console.log(chats);
    res.render("index.ejs", {chats});
})

// New Route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
})

// Create Route
app.post("/chats" , (req,res) => {
    let {from , to, msg } = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    newChat.save()
    .then((res) => {console.log("Chat was saved")})
    .catch((err) => {console.log(err)})
    res.redirect("/chats");
})

// wrapAsync 
function asyncWrap(fn) {
    return function (req,res,next) {
        fn(req,res,next).catch((err) => next(err));
    }
}
// Edit Route
app.get("/chats/:id/edit" , asyncWrap(async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
}));

// Update Route
app.put("/chats/:id" , async (req,res) => {
    try{
       let {id} = req.params;
       let { msg : newMsg} = req.body;
       let updatedChat = await Chat.findByIdAndUpdate(id, {msg : newMsg} , {runValidators : true, new : true});
        // console.log(updatedChat);
       res.redirect("/chats")
    }catch(err){
        next(err);
    }
    
})

// Destroy Route
app.delete("/chats/:id", async (req,res) => {
    try{
        let {id} = req.params;
        let deletedChat =  await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    }catch(err){
        next(err);
    }
  
})

app.get("/", (req,res) => {
    res.send("Its Working");
})

app.listen(8080, () => {
    console.log("Server listening on port 8080");
})