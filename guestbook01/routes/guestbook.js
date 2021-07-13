const express = require("express");
const controller = require("../controllers/guestbook");

const router = express.Router();
router.route("").get(controller.index);
router.route("/add").post(controller.add);
router.route("/delete").get(controller.deleteForm);
router.route("/delete/:id").get(controller.deleteForm);
router.route("/delete").post(controller.delete)
router.route("/delete/:id").post(controller.delete);

module.exports = router;
