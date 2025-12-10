// src/utils/cloudinaryUpload.js

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary with your credentials from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure the storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'peership_verification', // This will create a folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    // You can add transformations for images here if you want
    // transformation: [{ width: 1024, height: 1024, crop: 'limit' }]
  },
});

// Initialize Multer with the Cloudinary storage engine
const cloudinaryUpload = multer({ storage: storage });

export default cloudinaryUpload;