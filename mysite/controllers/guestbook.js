const { Sequelize } = require("sequelize");
const models = require("../models");

module.exports = {
    list: async(req, res, next) =>{
        try{
            const list = await models.Guestbook.findAll({
                attributes: [
                    "id", "name", "message", 
                    [Sequelize.fn("date_format",Sequelize.col("reg_date"),"%Y-%m-%d %H:%i:%s"),"regDate"]
                ],
                order:[["id","DESC"]],
                
            });
            
            res.render("guestbook/list",{
                list: list
            })
        } catch (error){
            next(error);
        }
    },

    spa: (req, res, next) =>{
        res.render("guestbook/spa-landing");
    },

    insert: async (req, res, next) =>{
        try{
            await models.Guestbook.create({
                name: req.body.name,
                password: req.body.pass,
                message: req.body.content
            });
            res.redirect("/guestbook");
        } catch(error) {
            next(error);
        }
    },

    delete: (req, res, next) =>{
        try{
            const id = req.params.id;
            res.render("guestbook/deleteform",{ id: id });
        } catch(error) {
            next(error);
        }
    },

    _delete: async (req, res, next) =>{
        try{
            const result = await models.Guestbook.destroy({
                where:{
                    id: req.body.id,
                    password: req.body.password
                }
            })
            if(result == 0){
                res.render("guestbook/deleteform",{
                    id: req.body.id,
                    result: 'fail'
                })
                return;
            }
            res.redirect("/guestbook");
        } catch(err){
            next(err);
        }
    }
}