// app create
const express = require('express');
const app = express();
// port   find krna h 
require('dotenv').config();

const PORT = process.env.PORT || 5000;



//middleware use krna h
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload(
    {
    useTempFiles : true,
    tempFileDir : '/tmp/'
    }
));


///db se  connect h 
const connectDB = require('./config/database');
connectDB();

//cloud se connect krna h 
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


// //home route bna h 
// app.get('/', (req, res) => {
//     res.send('<h1>File Upload and Image Upload using Cloudinary</h1>');
// });

//api route mount krna h 
console.log("1");
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);
console.log("2");

//activate server 
console.log("3");
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
console.log("4");


