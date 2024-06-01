const { DataTypes } = require('sequelize');
const config = require('../Server/config')

const Role_menu_link = config.define('role_menu_links', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Role_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Menu_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Action: {
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

module.exports = Role_menu_link;