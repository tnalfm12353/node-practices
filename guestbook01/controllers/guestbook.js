const guestbookApi = require("../models/guestbook");

module.exports = {

    index: async (req, res) =>{
        const results = await guestbookApi.index();
        res.render("index", {
            list : results || []
        });
    },

    add: async (req, res) =>{
        await guestbookApi.add(req.body);
        res.redirect("/");
    },

    deleteForm: (req, res) =>{
        res.render("deleteform",{
            id: req.query.id || req.params.id
        });
    },

    delete : async (req, res) =>{
        const results = await guestbookApi.delete(req.body);
        results.affectedRows > 0 ? res.redirect("/") :  res.send("<h1>잘못된 비밀번호 입니다.</h1> <a href='/'>홈으로</a>");
    }
}