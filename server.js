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
const corsOptions = {
    origin: ['http://localhost:3000', 'https://medscore-api.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you're using cookies or authentication
    maxAge: 86400 // How long the results of a preflight request can be cached
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
