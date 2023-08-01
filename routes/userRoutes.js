const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup");

userRouter.post("/login");

userRouter.post("/logout");

userRouter.get("/current");

module.exports = userRouter;
