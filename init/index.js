const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("Connected to DB!");
    })
    .catch((err) =>{
        console.log(err);
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDB = async () => {
    await Listing.deleteMany({}); // first we empty our DB before initializing
    // to reinitialize our data with owner this time (authorization)
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "685427319e7c2f2b10b19f2a"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized!");
}

initDB();

// run this file to initialize the data!