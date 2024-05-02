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
mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    //Listen for requests
    app.listen(process.env.PORT,()=>{
    console.log('Connected to database & Listening on port',process.env.PORT);
    });
  })
  .catch((error)=>{
    console.log(error);
  });





