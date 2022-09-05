//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt =require('mongoose-encryption');

mongoose.connect('mongodb://localhost:27017/userDB');
var userSchema = new mongoose.Schema( { username: String,password:String });


var secret_ = process.env.SECRET
userSchema.plugin(encrypt, { secret:secret_,encryptedFields: ['password'] });
const user = mongoose.model('user',userSchema);


const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

app.route('/')
.get(function(req,res){
    res.render('home')
})

app.route('/register')
.get(function(req,res){
    res.render('register')
})
.post(function(req,res){
var userid = {
    username:req.body.username,
    password:req.body.password
}
const newuser = new user(userid);
newuser.save(function(err){
    if (err){
        res.send("error")
    }
    else{
        res.render('secrets')
    }
})
})


app.route('/login',)
.get(function(req,res){
    res.render('login')
})
.post(function(req,res){
   var email=req.body.username;
    var password=req.body.password
    user.findOne({username:email},function(err,founduser){

        if (err){
            console.log(err)
        }
       if (founduser)
       {
            if(founduser.password === password)
            {
                res.render('secrets')
            }
            else{
                res.send("Incorrect password")
            }
        }
    })
})


app.listen(3000,function(){
    console.log("the server is listening on port 3000")
})
