const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    return sequelize.define('Guestbook', {
        id: {
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        }, name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
    
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
    
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    
        regDate: {
            field: "reg_date",
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: DataTypes.NOW
        }
    
    },{
        tableName: "guestbook",
        timestamps: true,
        createdAt: "regDate",
        // createdAt: false,
        updatedAt: false,
    })
}