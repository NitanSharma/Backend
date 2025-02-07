const express = require("express");
// express object has a Router() method creates a new router object
const router = express.Router();

// Index -users
router.get("/", (req,res) => {
    res.send("GET for users");
})
// Show 
router.get("/:id", (req,res) => {
    res.send("Get for user id");
})

module.exports = router;// exporting router object