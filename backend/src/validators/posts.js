const { body, param } = require("express-validator");

const validateParamIdInPost = [
  param("user_id", "User ID is invalid").isLength({ min: 24, max: 24 }),
];

const validateBodyIdInPost = [
  body("user_id", "User ID is required").not().isEmpty(),
  body("user_id", "User ID is invalid").isLength({ min: 24, max: 24 }),
];

const validateBodyInPost = [
  body("title", "Title is required").not().isEmpty(),
  body(
    "title",
    "Title must have a minimum of 1 and a maximum of 50 characters"
  ).isLength({
    min: 1,
    max: 50,
  }),
  body(
    "content",
    "Content may only have a minimum of 1 and a maximum of 5000 characters"
  )
    .optional({ checkFalsy: true })
    .isLength({
      min: 1,
      max: 5000,
    }), // checkFalsy to allow falsy values to pass validation.
  body("url", "Url is invalid").optional({ checkFalsy: true }).isURL(),
  body(
    "slug",
    "Slugs should be in alphanumeric characters, optionally hyphens and underscores"
  )
    .optional({ checkFalsy: true })
    .matches(/^[a-z0-9_-]+$/), //alphanumeric + underscore + hyphens
  body(
    "tags",
    "Tags should be in alphaumeric characters, and optionally hyphens only"
  )
    .optional({ checkFalsy: true })
    .matches(/^[\w-]+(?:,[\w-]+)*$/), //alphanumeric + hyphens only
  body("images", "Please provide image address")
    .optional({ checkFalsy: true })
    .isURL(), //if using URL
  body(
    "meta_description",
    "meta_description may only have a minimum of 2 and maximum of 200 characters"
  ).isLength({ min: 2, max: 200 }),
];

module.exports = {
  validateParamIdInPost,
  validateBodyIdInPost,
  validateBodyInPost,
};
