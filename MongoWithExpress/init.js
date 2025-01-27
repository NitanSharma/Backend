// Initialize Database
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

// connection setup
main().then(() => {
    console.log("Connection Successfully");
}).catch((err) => {
    console.log(err);
})

async function  main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// adding data into DB

Chat.insertMany([
    {
    from : "NX100",
    to : "Sanam",
    msg : "You look amazing today",
    created_at : new Date()
    },
    {
        from : "RX9",
        to : "RAJ",
        msg : "Send me your instagram profile",
        created_at : new Date()
    },
    {
        from : "Orange",
        to : "Blue",
        msg : "I don't like you, Blue",
        created_at : new Date()
    },
]);