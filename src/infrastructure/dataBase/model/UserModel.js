const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: [String] },
    about: { type: String },
    gender: { type: String },
    pincode:{type:String},
    town:{type:String},
    dob:{type:Date},
    userId:{type:String},
    isPremium:{
        type:Boolean,
        default :false 
    },
    memberShipType:{
        type: String,
        default :"none" 

    }
    
},{
    timeStamps:true

});

module.exports = mongoose.model('User', userSchema);