const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const OrgPartner = config.define('org_partners', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TIN_No: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BIN_No: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contact_No: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Partner_Type: {
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

module.exports = OrgPartner;
