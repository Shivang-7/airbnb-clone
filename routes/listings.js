const express = require("express");
const Listing = require("../models/listing.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); // dest where we are uploading our image


//Index Route
router.get("/", wrapAsync(listingController.index)); 


//New Route (Create)
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.post("/", isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));


//Show Route (Read)
router.get("/:id", wrapAsync(listingController.showListing));


//Edit Route (Update)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.editListing));


//Destroy Route (Delete)
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));



module.exports = router;