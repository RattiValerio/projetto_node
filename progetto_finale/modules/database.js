const mongoose = require('mongoose');
const security = require('../modules/security.js')

const User = require('../models/User');
const Aircraft = require('../models/Aircraft');

mongoose.connect('mongodb://localhost:27017/progetto');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

let listUsers = async function() {
  try {
      const users = await User.find(); 
      return users;
  }catch (error) {
      console.error('Error fetching users:', error);
  }
};

let getUserByCredentials = async function(username, password) {
  try {
    let user = await User.findOne({ username: username});

    if (user && await security.compareHash(password, user.password)) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}


let getUserByUsername = async function(username) {
  try {
    let user = await User.findOne({ username: username});
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

let checkIfUserAlreadyExists = async function(username){
  try {
    let existingUser = await User.findOne({ username: username });
    if(existingUser){
      return true
    }else {
      return false
    }
  } catch (err) {
    console.error(err);
  }
}

let registerUser = async function(username, email, password){
  try {
    const hashedPassword = await security.hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return newUser;
  } catch (err) {
    console.error(err);
    return false
  }
}


let listAircrafts = async function() {
  try {
      const aircrafts = await Aircraft.find(); 
      return aircrafts;
  }catch (error) {
      console.error('Error fetching aircrafts:', error);
  }
};

let getAircraftById = async function(id){
  try{
    let aircraft = await Aircraft.findById(id);
    return aircraft
  } catch (error) {
    console.error('Error fetching aircraft:', error);
  }
}

exports.users = listUsers;
exports.registerUser = registerUser;
exports.getUserByCredentials = getUserByCredentials;
exports.getUserByUsername = getUserByUsername
exports.checkIfUserAlreadyExists = checkIfUserAlreadyExists;

exports.aircrafts = listAircrafts;
exports.getAircraftById = getAircraftById;
