const User = require('../Model/userModel');

const createUser = async (username, email, password) => {
  try {
    
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    const result = users.map(user => user.toJSON());
    return result;
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
};

const findUserById = async (userId) => {
  try {
  
  } catch (error) {
    console.error("Error finding user:", error);
  }
};

const updateUserById = async (userId, newData) => {
  try {
    
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const deleteUserById = async (userId) => {
  try {
   
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

module.exports = { createUser, getAllUsers, findUserById, updateUserById, deleteUserById };
