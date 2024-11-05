const express=require("express");
const connectDb = require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandlor")
const dotenv =require("dotenv").config();
const cors = require('cors');
connectDb();
const app=express();
app.use(express.json());
const port=process.env.port || 5001;
const path = require('path');

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api/user",require("./Router/registerRoutes"))

app.use(errorHandler)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port,()=>{
    console.log(`this is running in port ${port}`);
})
