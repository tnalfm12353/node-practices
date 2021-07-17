const models = require("../models");
const fileupload = require("../libs/fileupload");
module.exports = {
    main: async (req, res, next) =>{
        try{
            const result = await models.Site.findByPk(1);
            res.render("admin/main",{
                siteInfo: result
            });
        } catch(error) {
            next(error);
        }
    },

    updateSite: async (req, res, next) =>{
        try{
            const url = req.file != undefined ? fileupload.uploadImage("site", req.file) : undefined;
            const data = url != undefined ? Object.assign(req.body,{ profileURL : url}) : req.body;
            
            await models.Site.update(data,{ 
                where:{
                    id : 1
                }
            });

            res.redirect("/admin");
        } catch(error) {
            next(error);
        }
    },

    guestbook: async (req, res, next) =>{
        try{

            res.render("admin/guestbook");
        } catch(error) {
            next(error);
        }
    },

    board: async (req, res, next) =>{
        try{

            res.render("admin/board");
        } catch(error) {
            next(error);
        }
    },

    user: async (req, res, next) =>{
        try{

            res.render("admin/user");
        } catch(error) {
            next(error);
        }
    }
}