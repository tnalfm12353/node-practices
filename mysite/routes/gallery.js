const express = require("express");
const auth = require("./auth");
const controller = require("../controllers/gallery");

const router = express.Router();

router.route("").get(controller.list);
router.route("/upload").post(controller.upload);
router.route("/delete/:id").get(auth("ADMIN"),controller.delete);

module.exports = router;