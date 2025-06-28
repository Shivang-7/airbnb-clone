// To define the schema for server-side validation of the data
const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required()
});

module.exports = { listingSchema, reviewSchema };

// wese to we have implemented "form validations (client-side)", but still if 
// data is sent from hopscotch, postman or any other source, then it can be invalid