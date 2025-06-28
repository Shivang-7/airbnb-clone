if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const dbUrl = process.env.ATLASDB_URL;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
    .then(() => {
        console.log("Connected to DB!");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl);
}


const store =  MongoStore.create({
    mongoUrl: dbUrl, // where actually DB is -> MongoDB Atlas connection string 
    crypto: { // encryption
      secret: process.env.SECRET,
    },
    touchAfter: 24*3600, // interval between session updates (in sec)
});
store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET,  // to sign (or lock) our session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000, // aaj se ek week baad wali msec
        // if we doesn't set expires then it will be deleted automatically when the browser is closed - i.e. session cookie
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());



// Configuring passport local strategy -> authentication
app.use(passport.initialize());
// using session in user model, so that we don't have to login each time navigating different pages within a session
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use((req, res, next) => { // middleware for flash msgs
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//Listing model routes
app.use("/listings", listingRouter);

//Review model routes
app.use("/listings/:id/reviews", reviewRouter);
//issme jo :id wo yahan app.js tk hee reh ja rha, to make it reach to reviews.js,,
//ham ussme jab require krte to "mergeParams: true" set krr dete!

//User model routes
app.use("/", userRouter);




// to match it with rest all the incoming requests
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// Safe fallback for all unmatched routes -> If nothing matches, send 404
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
    // res.status(404).render("404.ejs"); --> to render a fancy 404 page
});

//Error Handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render("error.ejs", { message });
    // res.status(status).send(message);
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});