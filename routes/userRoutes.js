const express = require("express");

const userRouter = express.Router();

const {
  signUpSchema,
  signInSchema,
  validateBody,
} = require("../middlewares/userValidation");

const { signup, login } = require("../controllers/userControllers");

userRouter.post("/signup", validateBody(signUpSchema), signup);

userRouter.post("/login", validateBody(signInSchema), login);

userRouter.post("/logout");

userRouter.get("/current");

module.exports = userRouter;
