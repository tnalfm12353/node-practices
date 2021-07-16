const fs = require("fs");
const path = require("path");
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
            const file = req.file;
            console.log("upload-temp :" + file.path);

            const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.GALLERY_STORE_LOCATION);
            console.log("storeDir : " +storeDirectory);

            const url = path.join(process.env.GALLERY_STORE_LOCATION, file.filename) + path.extname(file.originalname);
            console.log("url : " + url);

            const storePath = path.join( storeDirectory, file.filename ) + path.extname(file.originalname);

            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: "w+"});

            await models.Gallery.create({
                url: url.replace(/\\/gi, '/'),
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