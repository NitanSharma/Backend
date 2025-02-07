const express = require("express");
// express object has a Router() method creates a new router object
const router = express.Router();

// Index
router.get("/" , (req,res) => {
    res.send("Get for posts");
})

// Show
router.get("/:id" , (req,res) => {
    res.send("Get for post id ");
})

module.exports = router;