const { Op ,Sequelize } = require("sequelize");
const models = require("../models");

module.exports = {
    add: async (req, res, next) =>{
        try{
            const result = await models.Guestbook.create(req.body);
            
            res.status(200).send({
                result: "success",
                data: Object.assign(result, {
                    password: '',
                }),
                message: null
            })

        } catch(error) {
            next(error);
        }
    },

    list: async (req, res, next) =>{
        try{
            const startIndex = req.query.index || 0;
            const list = await models.Guestbook.findAll({
                attributes: [
                    "id", "name", "message", 
                    [Sequelize.fn("date_format",Sequelize.col("reg_date"),"%Y-%m-%d %H:%i:%s"),"regDate"]
                ],
                // where: { // no pagination
                //   (startId > 0) ? {id: [Op.lte] : startId} : {}
                // },
                order:[["id","DESC"]],
                // pagination
                offset: parseInt(startIndex),
                limit: 5
            });
            res.status(200).send({
                result: "success",
                data: list,
                message: ""
            })

        } catch(error) {
            next(error);
        }
    },

    delete: async (req, res, next) =>{
        try{
            const result = await models.Guestbook.destroy({
                where: {
                    [Op.and] :{
                        id: req.params.id,
                        password:req.body.password
                    }
                }
            })
            if(result === 1){
                res.status(200).send({
                    result: "success",
                    data: req.params.id,
                    message:""
                })
            } else if(result === 0) { 
                res.status(200).send({
                    result: "success",
                    data: -1,
                })
            }
        } catch(error) {
            next(error);
        }
    }
}