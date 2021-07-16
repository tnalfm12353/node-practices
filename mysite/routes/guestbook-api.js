const express = require("express");
const controller = require("../controllers/guestbook-api");

const router = express.Router();

router.route("").post(controller.add);
router.route("").get(controller.list);
router.route("/:id").delete(controller.delete);


module.exports = router;