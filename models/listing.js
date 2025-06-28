const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Defining Schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [    // One to Many relationship with Review model
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

// in app.js listingSchema is a joi schema, and this .post is a mongoose middleware, 
// therefore this should be attached to a Mongoose schema...thus written here, not in app.js!
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Model or Collection
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;