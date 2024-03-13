const express = require("express");
const router = new express.Router();
const controller = require("../controller/controller");
const auth = require("../../middleware/auth");
const validateUserInput = require("../../middleware/validate");

router.post("/login", controller.login);
router.post("/signup",validateUserInput, controller.signup);


router.get("/users", auth, controller.getUsers);

router.get("/users/:id",auth, controller.getUserById);

router.patch("/updateuser/:id",validateUserInput,auth, controller.updateUser);

router.delete("/deleteuser/:id",auth, controller.deleteUser);

module.exports = router;
