const express = require("express");
const controller =  require("../controllers/admin");

const router = express.Router();

router.route("").get(controller.main);
router.route("/main/update").post(controller.updateSite);
router.route("/guestbook").get(controller.guestbook);
router.route("/board").get(controller.board);
router.route("/user").get(controller.user);

module.exports = router;
