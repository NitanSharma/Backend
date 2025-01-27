        //    45.   MONGODB PART 2 
// We also have to open MongoDB shell while executeing this code.
// Making change from javascript file to MongoDB database
// With the help of mongoose we can manipulate MongoDB database with javascript

const mongoose = require('mongoose');

// let url = "https://localhost:8080/users";

main()
.then(() => {
    console.log("Connection successful");// it confirm connection is okk..
})
.catch(err => console.log(err));// if error occure during connection it will run and print error

async function main() {// main function async function that help to connect with database
    // mongoose help our javascript file to connect with MongoDB database
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// S C H E M A 
const userSchema = new mongoose.Schema(
    {// blue print which things i have to store
        name : String,
        email : String,
        age : Number,
    }
);

//   Models
const User = mongoose.model("User" , userSchema);   // User ---- users
// this code execute and create a collections in MongoBD Shell
//const Employee = mongoose.model("Employee", userSchema)

// INSERTING one
const user2 = new User({name : "Nitin Sharma" , email : "sharma@123gmail.com" , age : 19});// object of user model or class

// user2.save().then((res) => { // save method return promise so we use .then and catch method
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// Inserting many

// User.insertMany([{},{},{},])

// User.find({}).then((res)=>{
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

// Delete 

// User.deleteOne({name : "Nitin"}).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

User.findByIdAndDelete("679731beaf15d2d4ebcf1bba").then((res) => {console.log(res)}).catch((err) => { console.log(err)});