
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override")

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

// Create the connection to database
const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Nitin125sharma',
  });


  let getRandomUser = () => {
    return [
       faker.string.uuid(),
       faker.internet.username(),
       faker.internet.email(),
       faker.internet.password(),
    ];
  }

  //let q = "SHOW TABLES";

  // Inseration into table
  // let q = "INSERT INTO user(id, username, email, password) VALUES ? ";
  // let users = [
  //   ["1237","Nitien","abc@12e3","1234e5"],
  //   ["1234","Nitin4","abc@1234","123454"] ,
  //   ["1238","Nitin8","abc@1238","123458"] ,
  // ];

      // Adding Data in Bulk using faker
      // let q = "INSERT INTO user(id, username, email, password) VALUES ? ";

      // let data =[];
      // for(let i=0; i<=100; i++){
      //   data.push(getRandomUser());// 100 fake user
      // }


  // try{
  //   connection.query(q, [data],(err,results) =>{
  //     if (err) throw err;
  //     console.log(results);
  //     console.log(results.length);
  //   });
  // }catch(err){
  //   console.log(err);
  // }
  
  // connection.end();

app.get("/", (req,res) => {// HOME ROUTE
    let q = "SELECT count(*) FROM user";
    try{
    connection.query(q,(err,results) =>{
      if (err) throw err;
     let count =  results[0]["count(*)"]   
      res.render("home.ejs", {count});      
    });
  }catch(err){
    console.log(err);
    res.send("Some error in DB");
  }  
})

// Show Route

app.get("/user", (req,res) =>{
  let q = "SELECT * FROM user";
  
  try{
    connection.query(q, (err,users) =>{
      if (err) throw err;
     //console.log(results) 
      res.render("show.ejs",{users} );
    });
  }catch(err){
    console.log(err);
    res.send("Some error in DB");
  }  
});

// Edit Route
app.get("/user/:id/edit", (req,res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  
  try{
    connection.query(q, (err,results) =>{
      if (err) throw err;
      let user = results[0];
      console.log(results) 
      res.render("edit.ejs",{user} );
    });
  }catch(err){
    console.log(err);
    res.send("Some error in DB");
  }  

})

// UPDATE  (db) ROUTE
app.patch("/user/:id", (req,res) => {
  let {id} = req.params;
  let {password : formPass , username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  
 try{
    connection.query(q, (err,results) =>{
      if (err) throw err;
      let user = results[0];
       if(formPass != user.password){
        res.send("Wrong Password");
       }else{
        let q = `UPDATE user SET username = '${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        })
       }
     
    });
  }catch(err){
    console.log(err);
    res.send("Some error in DB");
  }  
  
})
  

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
})



