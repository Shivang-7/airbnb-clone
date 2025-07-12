const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewControllers = require("../controllers/reviews.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewLimiter = (req, res, next) => next(); // temporarily relaxed for demo purposes to ensure smooth access



//Reviews Route (Create)
router.post("/", reviewLimiter, isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));


//Reviews Route (Delete)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.destroyReview));



module.exports = router;