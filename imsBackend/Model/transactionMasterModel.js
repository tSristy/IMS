const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const TransactionMaster = config.define('transaction_master', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Doc_No: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ref_no: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MVT_Type: {
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

module.exports = TransactionMaster;
