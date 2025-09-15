const express = require('express');
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageSizeReducer
} = require('../controllers/fileUpload.js');

console.log("44444");

//api route
router.post('/localfileupload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageSizeReducer', imageSizeReducer);

console.log("55555");

module.exports = router;