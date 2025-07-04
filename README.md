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
- [📝 Acknowledgements](#-acknowledgements)
- [🙇‍♂️ Author](#-author)
- [📄 License](#-license) 

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
├── controllers/          # Route logic & business operations
├── contr
├── models               # Mongoose models (User, Listing, Review)
├── public               # Static assets (CSS, client-side JS)
├── routes               # Express route handlers
├── utils                # Helper functions (e.g., middleware, error handling)
├── views                # EJS templates (pages, layouts, partials)
├── .env                   # Environment variables (excluded from Git)
├── app.js                 # Main Express server entry point
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation

airbnb-clone/  
├── app.js
├── cloudConfig.js
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init
│   ├── data.js
│   └── index.js
├── middleware.js
├── models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public
│   ├── css
│   │   ├── style.css
│   │   └── rating.css
│   └── js
│       └── script.js
├── routes
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
├── schema.js
├── utils
│   ├── ExpressError.js
│   └── wrapAsync.js
└── views
    ├── includes
    │   ├── navbar.ejs
    │   ├── flash.ejs
    │   └── footer.ejs
    ├── layouts
    │   └── boilerplate.ejs
    ├── listings
    │   ├── index.ejs
    │   ├── new.ejs
    │   ├── show.ejs
    │   └── edit.ejs
    ├── reviews
    │   └── review.ejs
    ├── users
    │   ├── signup.ejs
    │   └── login.ejs
    └── error.ejs
```
