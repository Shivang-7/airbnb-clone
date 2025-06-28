const Listing = require("../models/listing");
const fetch = require("node-fetch");


module.exports.index = async (req, res) => {
    const { search } = req.query;
    let allListings;
    if (search) {
        allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } }, // "i" flag makes it case-insensitive
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
        if (allListings.length === 0) {
            req.flash("error", "No listings found for your search.");
            return res.redirect("/listings");
        }
    } else {
        allListings = await Listing.find();
    }
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
    // again checking isloggedin to protect data addition from "postman like services without login"
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // owner of newly created listing -> current user
    newListing.image = { filename, url };
    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${newListing.location}`, 
        { // Geocoding - fetching lat/lng using nomination
            headers: {'User-Agent': 'MyAirbnbProject/1.0'}
        });
    const geoData = await geoResponse.json(); // long and lat data 
    newListing.geometry = { // storing that data into DB
        type: "Point",
        coordinates: [
            parseFloat(geoData[0].lon),
            parseFloat(geoData[0].lat)
        ]
    };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    // populate -> to get all the details of review->author and owner associated with this listing
    let listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}}) // nested populate
        .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};