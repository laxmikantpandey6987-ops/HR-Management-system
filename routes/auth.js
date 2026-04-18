const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    console.log("LOGIN HIT");
    res.json({ message: "LOGIN WORKING" });
});

module.exports = router;