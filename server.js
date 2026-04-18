const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: routes must be mounted like this
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employee", require("./routes/employee"));

app.get("/", (req, res) => {
    res.send("HR Backend Running");
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
});