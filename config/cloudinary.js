const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinaryConnect= () => {

    try{

        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        console.log('Cloudinary connected successfully');
    }
    catch(err){
        console.error('Cloudinary connection error:', err.message);
        process.exit(1);
    }
}; 

module.exports = cloudinary;


