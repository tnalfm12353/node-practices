const models = require("../models");

module.exports = {
    join: (req, res) =>{
        res.render("user/joinform");
    },

    _join : async (req,res) =>{
        const result = await models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender 
        });
        console.log(result);
        res.redirect("/user/joinsuccess");
    },

    joinsuccess: (req,res) =>{
        res.render("user/joinsuccess");
    },

    login: (req, res) =>{
        res.render("user/loginform");
    },

    _login: async (req, res) =>{
        const user = await models.User.findOne({
            attributes:["id","name","role"],
            where:{
                email: req.body.email,
                password: req.body.password
            }
        });
        if(user == null) {
            res.render("user/loginform",Object.assign(req.body, {
                result: "fail",
                password: ''
            }));

            return ;
        }

        // 로그인 처리
        req.session.authUser = user;
        res.redirect("/");
    },

    logout: async(req, res) =>{
        await req.session.destroy();
        res.redirect("/");
    },

    update: async(req, res) => {
        const authUser = await models.User.findByPk(req.session.authUser.id,{
            attributes:["name","email","gender"]
        });
        if(authUser === null){
            res.redirect("/user/login");
            return;
        }

        res.render("user/updateform",{
            user: authUser
        })
    },

    _update: async (req, res) =>{
        // if(req.body.name && req.body.gender && req.body.password) {
        //     await models.User.update({
        //         name: req.body.name,
        //         password: req.body.password,
        //         gender: req.body.gender
        //     },
        //     { 
        //         where:{
        //             id: req.session.authUser.id
        //         }
        //     });

        // } else if (req.body.name && req.body.gender){
        //     await models.User.update({
        //         name: req.body.name,
        //         gender: req.body.gender
        //     },
        //     { 
        //         where:{
        //             id: req.session.authUser.id
        //         }
        //     });
        // }

        const updateObject = Object.assign(req.body);
        if(updateObject['password'] == ''){
            delete updateObject['password'];
        }

        await models.User.update(updateObject,{
            where:{
                id: req.session.authUser.id
            }
        })
        
        res.redirect("/");
    }
}