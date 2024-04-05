const { body, param } = require("express-validator");

const validateBodyInUser = [
  body("username", "username is required").not().isEmpty(),
  body(
    "username",
    "username must be a minimum of 6 and maximum of 18 characters".isLength({
      min: 6,
      max: 18,
    })
  ),
  body("first_name", "first name is required").not().isEmpty(),
  body("first_name", "Please enter a valid name")
    .isLength({ min: 2 })
    .matches(/^[A-Za-z\s]+$/),
  body("last_name", "Please enter a valid name")
    .optional()
    .matches(/^[A-Za-z\s]+$/),
  body("email", "Please enter valid email").isEmail(),
  body("phone", "Please enter phone number").optional().isMobilePhone(),
  body("birthdate", "please enter birthdate in YYYY-MM-DD form")
    .optional()
    .isISO8601(),
  body("gender", "please enter alphabets only")
    .optional()
    .matches(/^[A-Za-z\s]+$/),
  body("greeting", "max characters of 200 allowed")
    .optional()
    .isLength({ max: 200 }),
  body("self_description", "max characters of 500 allowed")
    .optional()
    .isLength({ max: 500 }),
];

module.exports = {
  validateBodyInUser,
};
