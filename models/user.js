const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// (1) Create user Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create global var for user -- export model with user of type UserSchema
const User = module.exports = mongoose.model('User', UserSchema); // <- what will be inporting in users.js

// Create functions to call outside this file
module.exports.getUserById = function(id, callback){ // <- Takes in id and callback
  User.findById(id, callback); // <- Referse to the User we created & calls the findById mongoose function
}
// Get user by usernmae function
module.exports.getUserByUsername = function(username, callback){ // <- Takes in username and callback
  const query = {username:username} // <- Query username of username
  User.findOne(query, callback); // <- Calls the findOne function which takes in a query
}

// (2) Add user function -- export
module.exports.addUser = function(newUser, callback){
  // a. Hash the password -- generate salt
  bcrypt.genSalt(10, (err, salt) => {
    // b. Call in the password from new user
    bcrypt.hash(newUser.password, salt, (err, hash) =>{
      if(err) throw err;
      // c. Make w/e password gave in form and make it to hash
      newUser.password = hash;
      newUser.save(callback); // <- d. Will be the resonse of the function to post to DB
    });
  });

}