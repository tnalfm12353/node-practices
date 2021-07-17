const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('Site', {
        id: {
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },

        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        welcome: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        profileURL: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        tableName: "site",
        timestamps: false,
        underscore: true
    })
}