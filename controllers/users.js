const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        // register is a passport-local-mongoose method (or extension provided by plugin for authentication)
        const registeredUser = await User.register(newUser, password); // register new user with this password
        // now to automatically login user after signup
        req.login(registeredUser, (err) => { // takes callback as a parameter
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Staybnb!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => 
        {
    req.flash("success", "Welcome back to Staybnb!");
    // again redirecting to original path after login
    // but if we directly login through listings then redirectUrl would be empty... so to handle that
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logoutUser = async (req, res, next) => {
    req.logout((err) => { // takes callback as a parameter
        if(err){
            return next(err);
        }
        req.flash("success", "you are successfully logged out!");
        res.redirect("/listings");
    })
};