const mongoose = require('mongoose') 

let userSchema = new mongoose.Schema({
    ID : Number , 
    Name : String , 
    Email : String , 
    Street : String , 
    City : String , 
    Zipcode : Number,
    Tasks : [{ID: Number , Title : String , Completed : Boolean}] , 
    Posts : [{ID: Number , Title : String , Body : String}]
}) 

module.exports = mongoose.model('users',userSchema)