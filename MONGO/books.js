const mongoose =  require("mongoose");// require mongoose

main()
.then(() => {console.log("Connection Successful")})// main method that verify connection is estiblished
.catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");// connection estiblished
}

// Schema
const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 20,
    },
    author : {
        type : String,
    },
    price : {
        type : Number,
        min : [1,"Price is too low for Amazon Selling"]
    },
    discount : {
        type :Number,
        default : 0,
    }
});

// Model
const Book = mongoose.model("Book" , bookSchema);// create collections in database --> books

// Instance or Object of Book

// let book1 = new Book({
//     title : "The Subtle art of not giving a fuck",
//     author : "Mark Manson",
//     price :300,
// })

// book1.save().then((res) => { console.log(res)}).catch((err) => {console.log(err)});

// Validation in Updation & Error

Book.findByIdAndUpdate("67974401e2afd62010839369" , {price : -555} , {runValidators : true})// give error price not less then 1 
.then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err.errors.price.properties.message);
})

// if we run this without "runValidators then it change in the db -555 but in Schema we add min price 1";