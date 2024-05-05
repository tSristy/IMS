const { DataTypes } = require('sequelize');
const config = require('../Server/config');

const Role = config.define('roles', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Role_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Is_Active: {
        type: DataTypes.CHAR,
        allowNull: true
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

module.exports = Role;
