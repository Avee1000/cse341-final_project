const router = require("express").Router();
const invCont = require("../controllers/invController");
const utilities = require("../utilities");
const isAuthenticated = require("../utilities/authenticate");
const userValidation = require("../utilities/users-validator.js");


router.get("/users/accounts",
    isAuthenticated,
    invCont.getAllUsers);

router.post("/users/accounts/create",
    isAuthenticated,
    userValidation.createUserValidation,
    userValidation.validate,
    invCont.createUsers);

router.put("/users/accounts/edit/:id",
    isAuthenticated,
    userValidation.updateUserValidation(),
    userValidation.validate,
    invCont.editUsers);

router.delete("/users/accounts/delete/:id", isAuthenticated, invCont.deleteUsers);

module.exports = router;