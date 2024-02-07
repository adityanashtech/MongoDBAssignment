const User = require("../models/users");

const addUser = async (req, res) => {
  try {
    const addUser = new User(req.body);
    const createUser = await addUser.save();
    console.log(req.body);
    res.status(201).send(createUser);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).send(getUsers);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const getUsers = await User.findById(_id);
    res.status(200).send(getUsers);
  } catch (e) {
    res.status(500).send(e);
  }
};
const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const getUsers = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(getUsers);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const getUsers = await User.findByIdAndDelete(_id);
    res.status(200).send(getUsers);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
