const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const isAuthenticated = require("../utilities/authenticate");

router.get("/users/suggestions", isAuthenticated, invCont.getAllSuggestions);

router.post("/users/suggestions/create", isAuthenticated, invCont.createSuggestion)

module.exports = router;