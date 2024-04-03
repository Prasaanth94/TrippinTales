const { body } = require("express-validator");

const validateRegistrationData = [
  body("username", "username is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 8 and max is 50").isLength({
    min: 8,
    max: 50,
  }),
  body("first_name", "first name is required").not().isEmpty(),
  body("last_name", "last name is required").not().isEmpty(),
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
];

const validateLoginData = [
  body("email", "email is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
