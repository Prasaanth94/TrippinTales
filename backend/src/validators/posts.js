const {body, param} = require("express-validator")

const validateParamIdInPost = [
    param("user_id", "User ID is invalid").isLength({min:24,max:24}),
]; 

const validateBodyIdInPost = [
    body("user_id", "User ID is required").not().isEmpty(),
    body("user_id","User ID is invalid".isLength({min:24,max:24}))
]

const validateAddNewPost = [
    body("title","Title is required").not().isEmpty(),
    body("title", "Title must have a minimum of 1 and a maximum of 50 characters").isLength({
        min: 1,
        max: 50,
    }),
    body("content", "Content may only have a maximum of 1000 characters").isLength({
        max: 1000
    }),
    body("url","Url is invalid").isURL(), //TBC
    // body("slug","").matches(something?),
    body("tags","Tags must have a maximum of 12 characters").isLength({
        max: 12
    }),
    // body("images","").
    // body("meta_description", "").
]
