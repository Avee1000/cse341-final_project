const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const isAuthenticated = require("../utilities/authenticate");
const suggestionValidation = require("../utilities/suggestions-validator.js");


router.get("/users/suggestions",
    isAuthenticated,
    invCont.getAllSuggestions);

router.post("/users/suggestions/create",
    isAuthenticated,
    suggestionValidation.createSuggestionValidation,
    suggestionValidation.validate,
    invCont.createSuggestion);

router.put("/users/suggestions/edit/:id",
    isAuthenticated,
    suggestionValidation.updateSuggestionValidation,
    suggestionValidation.validate,
    invCont.editSuggestion);

router.delete("/users/suggestions/delete/:id", isAuthenticated, invCont.deleteSuggestion);

module.exports = router;