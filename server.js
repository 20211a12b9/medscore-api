const express=require("express");
const connectDb = require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandlor")
const dotenv =require("dotenv").config();
const cors = require('cors');
connectDb();
const app=express();
app.use(express.json());
const port=process.env.PORT || 5001;
const path = require('path');

app.use(cors())
const corsOptions = {
    origin: ['http://localhost:3000', 'https://medscore-api.onrender.com','medscore-api-f8g2gef3cghvdxgm.canadacentral-01.azurewebsites.net],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    maxAge: 86400 
  };
  
  app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api/user",require("./Router/registerRoutes"))

app.use(errorHandler)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port,()=>{
    console.log(`this is running in port ${port}`);
})
