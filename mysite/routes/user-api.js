const express = require("express");
const auth = require("./auth");
const controller = require("../controllers/user-api");

const router = express.Router();
router.route("/checkemail").get(controller.checkemail);
router.route("/needauth").get(auth, (res,req) => {
    res.send({
        result:"success"
    })
});

router.route("/error").get((res, req, next) =>{

    try{
        throw new Error("Broken");
    } catch(error) {
        next(error);
    }
})

module.exports = router;