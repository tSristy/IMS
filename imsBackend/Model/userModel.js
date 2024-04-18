const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const User = config.define('users', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Is_Active: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  timestamps: false
});

module.exports = User;
