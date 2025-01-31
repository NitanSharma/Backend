const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => {console.log("Connection Success")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username : String,
    addresses : [
        {
            _id :false,// this will not create id for the addresses
            location :String,
            city : String,
        },
    ]
})

const User = mongoose.model("User", userSchema);

// One to Few (Implemenatation) ---> store child document inside parent.
const addUsers = async () => {
    let user1 = new User({
        username:"Nitin",
        addresses : [{
            location : "221B Baker Street",
            city: "London"
        }]
    })
    user1.addresses.push({location:"P32 WallStreet", city:"London"});
   let result =  await user1.save();
   console.log(result);
}

addUsers();