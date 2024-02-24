const { body } = require("express-validator");

const registerValidator = [
  body("email", "Invalid gmail").isEmail(),
  body("password", "Minimum 5 symbols").isLength({ min: 5 }),
  body("name", "Minimum 3 symbols").isLength({ min: 3 }),
  body("avatarUrl", "Wrong link").optional().isURL(),
];

const loginValidator = [
  body("email", "Invalid gmail data").isEmail(),
  body("password", "Empty line").isLength({ min: 1 }),
];

module.exports = {
  registerValidator,
  loginValidator,
};
