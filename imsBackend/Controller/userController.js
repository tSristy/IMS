const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../Model/userModel');

// JWT token Generate
const generateToken = (userId, username, email, roleId) => {
  return jwt.sign({ userId, username, email, roleId }, 'your_secret_key', { expiresIn: '1h' });
};

const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { Username: username },
          { Password: password }
        ]
      }
    });

    if (user) {
      // JWT token
      const { Id, Username, Email, Role_Id } = user;
      const token = generateToken(Id, Username, Email, Role_Id);
      return { token };
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during user authentication:', error);
    throw error;
  }
};

const createUser = async (username, email, password) => {
  try {

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    const result = users.map(user => user.toJSON());
    return result;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

const findUserById = async (userId) => {
  try {

  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

const updateUserById = async (userId, newData) => {
  try {

  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserById = async (userId) => {
  try {

  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

module.exports = { authenticateUser, createUser, getAllUsers, findUserById, updateUserById, deleteUserById };
