'use strict';

var debug = require('debug')('arma:campusaar:user');

var mongoose = require('mongoose');

var userSchema =  new mongoose.Schema( {
    firstname: String,  
    name: { type: String, index: true },  
    email: {type: String,  required: true},
    fonction: String,
    appartenance: String,
    imgurl:{type: String},  
    username:{type: String,unique: true,required: true} ,  
    userid:Number,  
    password: {type: String,  required: true},
    title : { type: String,  enum: ['Mr', 'Mrs', 'Mme', 'Miss','Dr','Pr'] },    
    comment: String,  
    address: String,  
    country: String,      
    phone:Number,     
    birthdate: Date,  
    state: { type: String,  enum: ['Actif', 'Desactivé', 'Attente', 'Bloqué'] },  
    profiles: { type: Array, index: true },
    tempprofiles: Array,
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
      }),


User = mongoose.model('user', userSchema);
module.exports = User;