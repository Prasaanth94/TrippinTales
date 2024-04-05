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
    "Content may only have a minimum of 1 and a maximum of 1000 characters"
  )
    .optional()
    .isLength({
      min: 1,
      max: 1000,
    }),
  body("url", "Url is invalid").isURL(),
  body(
    "slug",
    "Slugs should be in alphanumeric characters, optionally hyphens and underscores"
  )
    .optional()
    .matches(/^[a-z0-9_-]+$/), //alphanumeric + underscore + hyphens
  body(
    "tags",
    "Tags should be in alphaumeric characters, and optionally hyphens only"
  )
    .optional()
    .matches(/^[\w-]+(?:,[\w-]+)*$/), //alphanumeric + hyphens only
  body("images", "Please provide image address").optional().isURL(), //if using URL
  body(
    "meta_description",
    "meta_description may only have a maximum of 200 characters"
  )
    .optional()
    .isLength({ max: 200 }),
];

module.exports = {
  validateParamIdInPost,
  validateBodyIdInPost,
  validateBodyInPost,
};
