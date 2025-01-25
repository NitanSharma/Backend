const express = require("express");
const app = express();
const path = require("path");// to use public and viiews folder we have to require path from express.
const { v4 : uuidv4} = require("uuid"); 
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.use(express.urlencoded({extended : true}));// express parse the data that is send in request in post request

app.set("view engine", "ejs");// express check all ejs file in views folder
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));// public folder to access static file


let posts = [
    {
        id :uuidv4(),
        username : 'Nitin',
        content : 'I love Coding'
    },
    {
        id: uuidv4(),
        username : 'Nitin Sharma',
        content : 'I love Coding'
    },
    {
        id : uuidv4(),
        username : 'Rohit',
        content : 'I love Coding'
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs" , {posts});
})
// CREATE AND NEW ROUTE
app.get("/posts/new", (req,res) => {// Serve the form
    res.render("new.ejs");
})

app.post("/posts", (req,res) => {// add the new Post
    let {username , content } = req.body;
    let Id = uuidv4();
    posts.push({Id,username,content})
   // console.log(req.body);
   // res.send("post request working");
   res.redirect("/posts");
})

// SHOW ROUTE

app.get("posts/:id", (req,res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

// Update Route

app.patch('/posts/:id', (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect('/posts')
})

// Edit Route
// We use method-override package b/c html form does not support patch, put and Delete request
app.get('/posts/:id/edit', (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit', {post})
})

// Delete Route
app.delete('/posts/:id', (req,res) =>{
    let {id} = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts')
})

app.listen(8080, () => {
    console.log("app is listening on the port 8080");
})