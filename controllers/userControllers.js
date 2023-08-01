const User = require("../db/models/userModel");

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
};
