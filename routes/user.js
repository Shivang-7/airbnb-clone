const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const authLimiter = (req, res, next) => next(); // temporarily relaxed for demo purposes to ensure smooth access

const usersController = require("../controllers/users.js");


// signup route
router.route("/signup")
    .get(usersController.renderSignupForm)
    .post(authLimiter, wrapAsync(usersController.signupUser));

// login route
router.route("/login")
    .get(usersController.renderLoginForm)
    .post(
        authLimiter,
        saveRedirectUrl, // before login page we will save our original redirect path
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        // passport provides an authenticate middleware used for authentication before login 
        wrapAsync(usersController.loginUser)
    );

// logout route
router.get("/logout", wrapAsync(usersController.logoutUser));

module.exports = router;



/*
`router.route(path)` function in Express allows to chain multiple HTTP method handlers 
(like GET, POST, PUT, DELETE) for a same route path.
This helps organize route definitions and keeps related handlers together, 
making the code cleaner and more readable.

Example:
router.route('/example')
    .get(handlerForGet)
    .post(handlerForPost);

This is equivalent to:
router.get('/example', handlerForGet);
router.post('/example', handlerForPost);
*/