/*
to setup the connection to Cloudinary using environment variables
*/

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Set up multer storage to use Cloudinary for storing uploaded files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'staybnb_DEV', // All uploads will go into this folder in Cloudinary
    allowedFormats: async (req, file) => ["png", "jpg", "jpeg"], // Restrict file types
  },
});


// Export the configured cloudinary instance and storage engine for use in routes/middleware
module.exports = {
    cloudinary, storage
}