const JOI = require("joi");

const signUpSchema = JOI.object({
  name: JOI.string().required(),
  email: JOI.string().required(),
  password: JOI.string().required(),
});

const signInSchema = JOI.object({
  email: JOI.string().required(),
  password: JOI.string().required(),
});

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    next();
  };

  return func;
};

module.exports = { signUpSchema, signInSchema, validateBody };
