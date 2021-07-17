const fileupload = require("../libs/fileupload");
const models = require("../models");

module.exports = {
    list: async(req, res, next) =>{
        try{
            const results = await models.Gallery.findAll({
                attributes: ["id" , "url", "comment"],
                order: [
                    ["id", "desc"]
                ]
            });
            res.render("gallery/index",{
                galleries: results
            })
        } catch (error){
            next(error);
        }
    },
    
    upload: async (req, res, next) =>{
        try{
            const url = fileupload.uploadImage("gallery", req.file);

            await models.Gallery.create({
                url: url,
                comment: req.body.comment || ""
            });

            res.redirect("/gallery");
        } catch(error) {
            next(error);
        }
    },

    delete: async (req, res, next) =>{
        try{
            await models.Gallery.destroy({
                where: {
                    id: req.params.id
                }
            })
            
            res.redirect("/gallery");
        } catch(error) {
            next(error);
        }
    }
}