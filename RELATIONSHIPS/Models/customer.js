const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => {console.log("Connection Success")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item:String,
    price:Number,
});

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref : "Order"
        }
    ]
})

// customerSchema.pre("findOneAndDelete", async () => {// Query Middlewares --- > Pre Middlewares
//     console.log("PRE MIDDLEWARES");
// })

customerSchema.post("findOneAndDelete", async (customer) => {
   if(customer.orders.length){
    let res = await  Order.deleteMany({_id : {$in : customer.orders}})
    console.log(res);
   }
})

const Order = mongoose.model("Order", orderSchema);// modle
const Customer = mongoose.model("Customer" , customerSchema);


// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {item: "Somasa" , price : 12},
//         {item : "Chips" , price : 10},
//         {item : "Chocolate", price : 40},      
//    ] );
//     console.log(res);
// }
// addOrders();

// Approcah 2
// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name : "Rahul Kumar",
//     });

//     let order1 = await Order.findOne({item : "Chips"});
//     let order2 = await Order.findOne({item : "Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//   let result =  await cust1.save();
//   console.log(result);
// }
// addCustomer();

const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result);
}
// findCustomer();

const addCust = async () => {
    let newCust = new Customer({
        name: "Rahul"
    });

    const newOrder = new Order({
    item : "Pizza",
    price : 250,
   });

   newCust.orders.push(newOrder);
   await newOrder.save();
   await newCust.save();

   console.log("added new customer");

}

// addCust();

const delCust = async () => {
    let data = await Customer.findByIdAndDelete('679f1d6cb9ca36f72b22d72f');
    console.log(data);
}

delCust();
