const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const Category = config.define('categories', {
  Category_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Category_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Parent_Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Category_Path: {
    type: DataTypes.STRING,
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

module.exports = Category;
