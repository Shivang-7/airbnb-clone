const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
    // passport-local-mongoose will automatically define username, password (hashing, salting), 
    // and many methods like changePassword, etc..
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);