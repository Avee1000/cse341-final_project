const {
    body,
    validationResult
} = require("express-validator");

// CREATE USER VALIDATION
const createUserValidation = [
    body("githubId")
    .notEmpty().withMessage("GitHub ID is required")
    .isString().withMessage("GitHub ID must be a string"),

    body("username")
    .notEmpty().withMessage("Username is required")
    .isString().withMessage("Username must be a string"),

    body("displayName")
    .optional()
    .isString().withMessage("Display Name must be a string"),

    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email must be a valid email address"),
];

// UPDATE USER VALIDATION
const updateUserValidation = () => {
    return [
        // Allow partial updates: only validate fields if they are present
        body("githubId")
            .optional()
            .isString().withMessage("GitHub ID must be a string"),

        body("username")
            .optional()
            .isString().withMessage("Username must be a string"),

        body("displayName")
            .optional()
            .isString().withMessage("Display Name must be a string"),

        body("email")
            .optional()
            .isEmail().withMessage("Email must be a valid email address"),
    ];
};

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
}

module.exports = {
    createUserValidation,
    updateUserValidation,
    validate
};