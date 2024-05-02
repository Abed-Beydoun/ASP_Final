require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./Routes/User');
const schedulingRoutes = require('./Routes/Scheduling');
const cors = require('cors');


//Express app
const app = express();


//Middleware
app.use(express.json());
app.use((req,res,next)=>{
   console.log(req.path,req.method);
   next();
});

 //cors
const options = {
  origin: "http://localhost:5501",
  methods: ['GET','POST','PUT','DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(options));

//Routes
app.use('/api/user',userRoutes);

app.use('/api/scheduling',schedulingRoutes);


//Connect to Databse
mongoose.connect("mongodb+srv://AbedBeydoun:Abed3569AnB@asp.0sm6zpb.mongodb.net/?retryWrites=true&w=majority&appName=ASP")
  .then(()=>{
    //Listen for requests
    app.listen(5500,()=>{
    console.log('Connected to database & Listening on port',5500);
    });
  })
  .catch((error)=>{
    console.log(error);
  });





