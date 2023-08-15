const express = require("express");

const userRouter = express.Router();

const {
  signUpSchema,
  signInSchema,
  validateBody,
} = require("../middlewares/userValidation");

const {
  signup,
  login,
  logout,
  getCurrent,
} = require("../controllers/userControllers");
const authenticate = require("../middlewares/authenticate");

userRouter.post("/signup", validateBody(signUpSchema), signup);

userRouter.post("/login", validateBody(signInSchema), login);

userRouter.post("/logout", authenticate, logout);

userRouter.get("/current", authenticate, getCurrent);

module.exports = userRouter;
