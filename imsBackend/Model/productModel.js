const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const Product = config.define('products', {
    Product_Id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Product_Type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Product_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Depreciation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Model_No:{
    type: DataTypes.STRING,
    allowNull:false
  },
  Category_Id:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  Created_By:{
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

module.exports = Product;
