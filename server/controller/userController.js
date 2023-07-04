const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");

//jwt token generation
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//register user
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // check if user is already registered
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json("Email already exist.");
    }
    // validation
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required.");
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must be contain uppercase, lowercase, number, symbol and minimum 8+ chars."
        );
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //new user create
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    // create token
    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      _id: user._id,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json("user not found in database");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(404).json("password does not match");
    }
    const token = await createToken(user._id);
    return res.status(200).json({ success: true, _id: user._id, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// find single user
const findUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json("UserId not valid");
  }
  try {
    const user = await userModel.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// find all users
const findAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    const countDocument = await userModel.countDocuments(user);
    return res.status(200).json({ countDocument, user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { registerUser, loginUser, findUser, findAllUsers };
