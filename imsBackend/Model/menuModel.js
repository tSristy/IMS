const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const Menu = config.define('menus', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Is_Active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  URL_Path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Parent_Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Created_By: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  Modified_By: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Modified_Date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Menu;
