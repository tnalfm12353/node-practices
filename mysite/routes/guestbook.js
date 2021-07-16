const express = require("express");
const controller = require("../controllers/guestbook");

const router = express.Router();

router.route("").get(controller.list);
router.route("/spa").get(controller.spa);
router.route("/insert").post(controller.insert);
router.route("/delete/:id").get(controller.delete);
router.route("/delete").post(controller._delete);

module.exports = router;