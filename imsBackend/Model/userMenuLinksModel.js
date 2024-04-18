const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const UserMenuLink = config.define('user_menu_links', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  User_Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Menu_Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Is_Active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  Actions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Created_By: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Modified_By: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  Modified_Date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = UserMenuLink;
