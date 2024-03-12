const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "THISISMYSECRETKEYFORJWTAUTHENTICATIONFORNODEPROJECT"
const mongoose = require("mongoose");

const signup = async (req, res) => {
  try {
      const { username, email, phone, password } = req.body;
      if (!username || !email || !phone || !password) {
          return res.status(422).json({ error: "Please fill all the fields" });
      }
      
      // check if user already exists in database
      const userExist = await User.findOne({ email });
      if (userExist) {
          return res.status(422).json({ error: "Email already exists" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
          // _id: new mongoose.Types.ObjectId(),
          username,
          email,
          phone,
          password: hashedPassword
      });
      console.log(result)
      const token = jwt.sign({ id: result._id , email: result.email}, SECRET_KEY);
      res.status(200).json({ message:"User created successfully", token });
  } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
  }
}

const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ error: "Please fill all the fields" });
      }
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id , email: user.email}, SECRET_KEY);
      res.status(200).json({ message: "User logged in successfully", token });
  } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
  }
}
// const addUser = async (req, res) => {
//   try {
//     const addUser = new User(req.body);
//     const createUser = await addUser.save();
//     console.log(req.body);
//     res.status(201).send(createUser);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };

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
  
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login,
};
