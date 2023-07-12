const express = require("express");
const app = express();
const connectDB = require('./config/connectDB');
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
     console.log(`Server is running on port ${PORT}`);
 });
 