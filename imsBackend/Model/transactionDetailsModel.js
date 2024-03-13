const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const TransactionDetails = config.define('transaction_details', {
    Id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Transaction_Id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Product_Id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Serial_No: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Quantity:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Unit_Price:{
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Total_Price:{
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Warranty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Abs_Quantity:{
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

module.exports = TransactionDetails;
