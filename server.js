const express=require("express");
const connectDb = require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandlor")
const dotenv =require("dotenv").config();
const cors = require('cors');
connectDb();
const app=express();
app.use(express.json());
const port=process.env.port || 5001;

app.use(cors())
app.use("/api/user",require("./Router/registerRoutes"))
app.use("/api/user",require("./Router/registerRoutes"))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`this is running in port ${port}`);
})
