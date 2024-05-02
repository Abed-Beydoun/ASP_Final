const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

//Static signup method
userSchema.statics.signup = async function(email,password){
   
   //Validation
   if(!email || !password){
    throw Error('All fields must be filled!');
   }
   if(!validator.isEmail(email)){
    throw Error('Email is not valid!');
   }
   if(!validator.isStrongPassword(password)){
    throw Error('Password is weak!');
   }

   //Check if email exists and hash the passwords 
   const exists = await this.findOne({email});
   
   if(exists){
    throw Error("Email exists!");
   }
   
   //Adding random values to the password before hashing
   const salt = await bcrypt.genSalt(10);

   //hashing salt with password
   const hash = await bcrypt.hash(password,salt);

   //storing user document
   const user = await this.create({email, password:hash});
   
   return user;
};

//static login method
userSchema.statics.login = async function(email,password){
   //Validation for inputs
   if(!email || !password){
    throw Error('All fields must be filled!');
   }
   
   //Check if email is valid
   const user = await this.findOne({email});
   if(!user){
    throw Error("Incorrect email!");
   }

   //Match login password with the hashed password in database
   const match = await bcrypt.compare(password,user.password);

     //If hash doesnt match password
     if(!match){
        throw Error("Incorrect password");
     }
     //if password match
     return user;
};


module.exports = mongoose.model('user',userSchema);