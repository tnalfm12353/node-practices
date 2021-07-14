const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>{
    return sequelize.define('User', {
        id: {
            field: "id",
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        gender: {
            type: DataTypes.ENUM(["male","female"]),
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM(["USER","ADMIN"]),
            defaultValue: "USER",
        }

    },{
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: "user"
    });
}