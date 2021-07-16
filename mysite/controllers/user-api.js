const models = require("../models");

module.exports = {
    checkemail: async (req, res, next) => {
        console.log(req.query.email);
        try{
            const user = await models.User.findOne({
                attributes: ["id"],
                where: {
                    email: req.query.email || ''
                }
            })
            res.send({
                result: "successs",
                data: user !== null,
                message: null
            });
        } catch (error) {
            next(error);
        }

    }
}