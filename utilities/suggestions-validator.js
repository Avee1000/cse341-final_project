const {
    body,
    validationResult
} = require("express-validator");

const createSuggestionValidation = [
    body("suggestion")
        .notEmpty().withMessage("Suggestion is required")
        .isString().withMessage("Suggestion must be a string")
        .trim(),
];

const updateSuggestionValidation = [
    body("suggestion")
        .notEmpty().withMessage("Suggestion is required for update")
        .isString().withMessage("Suggestion must be a string")
        .trim(),
];

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
    createSuggestionValidation,
    updateSuggestionValidation,
    validate
};
