const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const rateLimit = require('express-rate-limit');



module.exports.isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        // before login page we will save our original redirect path
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in!");
        return res.redirect("/login");
    }
    next();
});


module.exports.saveRedirectUrl = ((req, res, next) => {
    // when passport method is called it clear the session.. 
    // so we will first save our redirected path in locals variable and calling it before passport
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
});


module.exports.isOwner = ( async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        // so that any other user can't edit/delete our listing using postman like services..
        req.flash("error", "You don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
});


// Checking schema validations (server-side) -> "joi package" is used for this purpose
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((elt) => elt.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((elt) => elt.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    } 
};


module.exports.isReviewAuthor = ( async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        // so that any other user can't edit/delete our review using postman like services..
        req.flash("error", "You don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
});



// General rate limiter (for login/signup)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 10 requests per windowMs
    message: "Too many attempts from this IP, please try again after 15 minutes."
});
// Stricter limiter for review creation
const reviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,
    message: "Too many reviews submitted from this IP, please try again later."
});
module.exports.authLimiter = authLimiter;
module.exports.reviewLimiter = reviewLimiter;