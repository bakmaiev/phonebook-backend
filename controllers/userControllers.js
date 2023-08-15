const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email is used" });
    return;
  }
  const newUser = new User({ name, email, password });
  await newUser.hashPasvord(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60m" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
    return;
  }

  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    res.status(401).json({
      message: "Email or password is incorrect",
    });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60m" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      name: user.name,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const getCurrent = (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

// console.log(SECRET_KEY);

module.exports = { signup, login, logout, getCurrent };
