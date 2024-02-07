const express = require("express");
const router = new express.Router();
const controller = require("../controller/controller");

router.post("/adduser", controller.addUser);

router.get("/users", controller.getUsers);

router.get("/users/:id", controller.getUserById);

router.patch("/updateuser/:id", controller.updateUser);

router.delete("/deleteuser/:id", controller.deleteUser);

module.exports = router;
