const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    return sequelize.define('Gallery', {
        id: {
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        
        comment: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    
        url: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    
    },{
        tableName: "gallery",
        underscore: true,
        timestamps: false
    })
}