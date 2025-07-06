# Airbnb Clone – Full Stack Web Application
A full-stack web application inspired by Airbnb, built as a major project using the **MERN stack**, **Leaflet.js**, **Cloudinary**, and various Express middleware packages.

<br> 

## Table of Contents
- [🌐 Live Preview](#-live-preview)  
- [📌 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Demo](#-demo)
- [🚀 How to Run Locally](#-how-to-run-locally)
- [📁 Folder Structure](#-folder-structure)
- [👨‍💻 Author](#-author)
- [🛡️ License](#-license)
- [📚 Educational Purpose Disclaimer](#-educational-purpose-disclaimer)
- [📬 Contact](#-contact)

<br>

## 🌐 Live Preview

🚀  **Check it out live: [Airbnb Clone](https://airbnb-clone-18sd.onrender.com/listings)**  

⚠️ _Hosted on Render — the server may take 20–30 seconds to wake up due to free-tier limitations. Please be patient while it loads!_

<br> 

## 📌 Features

- **User Authentication** with secure login, logout, and session handling using Passport.js (Local Strategy)  
- **Protected Routes & Authorization**, ensuring users can only modify their own listings  
- **Full Listings CRUD** — create, read, update, and delete listings with form validation  
- **Image Uploads** with Cloudinary integration and support for file filtering  
- **Interactive Maps** on listing pages using Leaflet.js and OpenStreetMap  
- **Geocoding**: Convert listing addresses into map coordinates using the Nominatim API  
- **Review & Rating System** with user-specific actions (edit/delete only by review author)  
- **MongoDB Session Storage** using `connect-mongo` for persistent login sessions  
- **Flash Messaging System** for user feedback on all major actions  
- **Custom Error Handling** using Express middleware and centralized error classes  
- **Responsive UI** built with EJS templating, Bootstrap styling, and server-side rendering  

<br>

## 🛠️ Tech Stack

### 🌐 Frontend
- 📝 **EJS** – Server-side rendering with clean templating
- 🎨 **Bootstrap** – Responsive UI and layout
- 🗺️ **Leaflet.js** – Lightweight interactive maps with OpenStreetMap

### ⚙️ Backend
- 🚀 **Node.js & Express.js** – Scalable backend server and routing
- 🛡️ **Passport.js** – Authentication & session management
- 💬 **Connect-flash & Express-session** – Flash messages and user sessions
- ❗ **Custom Error Middleware** – Clean and centralized error handling

### 💾 Database & Storage
- 🍃 **MongoDB (Atlas)** – NoSQL cloud database for flexible data storage
- 🐵 **Mongoose** – ODM for MongoDB with schema-based models
- 🧠 **connect-mongo** – MongoDB-based session store
- ☁️ **Cloudinary** – Image upload, storage & optimization

### 📍 APIs & Services
- 🌍 **Nominatim API (OpenStreetMap)** – Free geocoding
- 📡 **Leaflet Tile Layers** – Open map visualization with public tiles

### ☁️ Hosting
- ⚙️ **Render** – Backend & frontend hosting *(free tier)*

<br>

## 📸 Demo


<br>

## 🚀 How to Run Locally

### 1. Clone the Repository

```
git clone https://github.com/Shivang-7/airbnb-clone.git
cd airbnb-clone
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file and add the following:
```
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
ATLASDB_URL=your_mongodb_url
SECRET=your_session_secret
```

### 4. Start the Server
```
npm run dev
```

Open http://localhost:8080/listings in your browser.

<br>

## 📁 Folder Structure

```
airbnb-clone/  
├── controllers/                 # Route handlers - separates logic from routes
│   ├── listings.js              # (create,read, update, delete)
│   ├── reviews.js               
│   └── users.js                 # user-related actions (login/signup)
├── init/                        # Initialization and seed data
│   ├── data.js                  # Dummy data for seeding the database
│   └── index.js                 # Script to initialize app with seed data
├── models/                      # Mongoose schemas and models
│   ├── listing.js               
│   ├── review.js                
│   └── user.js                  
├── public/                      # Public static assets
│   ├── css/
│   │   ├── style.css            # General site-wide styling
│   │   └── rating.css           # CSS for rating stars
│   └── js/
│       └── script.js            # JS scripts (client-side)
├── routes/                      # Express route definitions
│   ├── listings.js              # Routes for listing CRUD
│   ├── reviews.js               # Routes for reviews
│   └── user.js                  # Routes for user auth (login/signup)
├── utils/                       # Utility/helper functions
│   ├── ExpressError.js          # Custom error class for Express
│   └── wrapAsync.js             # Wrapper for catching async route errors
├── views/                       # EJS templates (frontend views)
│   ├── includes/                # Partial components reused across pages
│   │   ├── navbar.ejs           # Navbar partial
│   │   ├── flash.ejs            # Flash message partial
│   │   └── footer.ejs           # Footer partial
│   ├── layouts/                 # Layout templates
│   │   └── boilerplate.ejs      # Boilerplate HTML with <head>, <body>, etc.
│   ├── listings/                
│   │   ├── index.ejs            # All listings display page
│   │   ├── new.ejs              # Form to create a new listing
│   │   ├── show.ejs             # Detailed view of a listing
│   │   └── edit.ejs             # Form to edit a listing
│   ├── reviews/                 
│   │   └── review.ejs           # Partial or full view for reviews
│   ├── users/                   # User-related pages
│   │   ├── signup.ejs           
│   │   └── login.ejs            
│   └── error.ejs                # Error page template
├── .env                         # Environment variables
├── .gitignore                   # Files to be ignored by Git (node_modules, .env, etc.)
├── app.js                       # Entry point of the app (Express setup, middlewares)
├── cloudConfig.js               # Cloudinary image upload config
├── middleware.js                # Custom Express middlewares (e.g. isLoggedIn, isAuthor)
├── package.json                 # Project metadata and dependencies
└── schema.js                    # Joi validation schemas for form validation

```

<br>

## 👨‍💻 Author

**Shivang Yadav**  
[GitHub](https://github.com/Shivang-7) | [LinkedIn](https://www.linkedin.com/in/shivang-yadav108/)  

<br>

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).  
You are free to use, modify, and distribute this project for educational and personal purposes.

<br>

## 📚 Educational Purpose Disclaimer

> **This project is a clone of Airbnb website, developed solely for educational and demonstrative purposes.**  
> It is **not intended for commercial use**, and **Staybnb** is a fictional platform name.  
> All logos, trademarks, and brand names used are the property of their respective owners.

<br>

## 📬 Contact

If you have any questions, suggestions, or run into issues using this project, please feel free to:

- Open an issue in this repository
- Reach out to me via [email](mailto:yadavshivang2108@gmail.com)
- Connect on [LinkedIn](https://www.linkedin.com/in/shivang-yadav108/)

<br>
Happy coding! 😊
