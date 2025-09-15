# File Upload Application

A robust Node.js application for uploading files locally and to the cloud, with support for images, videos, and size reduction. Built with Express.js, MongoDB, and Cloudinary integration.

## Features

- **Local File Upload**: Upload files directly to the server's local storage.
- **Image Upload**: Upload images (PNG, JPEG, JPG) to Cloudinary with metadata storage in MongoDB.
- **Video Upload**: Upload videos (MP4, MOV, WMV) to Cloudinary.
- **Image Size Reduction**: Upload images with automatic size reduction (quality set to 300).
- **Email Notifications**: Automatically send email confirmations upon successful file uploads.
- **File Validation**: Ensures only supported file types are uploaded.
- **Database Integration**: Stores file metadata in MongoDB with timestamps.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Cloud Storage**: Cloudinary
- **File Handling**: express-fileupload
- **Email Service**: Nodemailer
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd fileupload
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=your_email_host (e.g., smtp.gmail.com)
   MAIL_USER=your_email_address
   MAIL_PASS=your_email_password
   ```

4. Ensure MongoDB is running locally or provide a cloud MongoDB URI.

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will run on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Local File Upload
- **POST** `/api/v1/upload/localfileupload`
- Uploads a file to the local `/files` directory.
- Request: Form-data with `file` field.

### Image Upload
- **POST** `/api/v1/upload/imageUpload`
- Uploads an image to Cloudinary and saves metadata to DB.
- Request: Form-data with `imageFile`, and body fields: `name`, `tags`, `email`.
- Supported formats: PNG, JPEG, JPG.

### Video Upload
- **POST** `/api/v1/upload/videoUpload`
- Uploads a video to Cloudinary and saves metadata to DB.
- Request: Form-data with `videoFile`, and body fields: `name`, `tags`, `email`.
- Supported formats: MP4, MOV, WMV.

### Image Size Reduction
- **POST** `/api/v1/upload/imageSizeReducer`
- Uploads an image to Cloudinary with size reduction (quality 300) and saves metadata to DB.
- Request: Form-data with `sizereducerFile`, and body fields: `name`, `tags`, `email`.
- Supported formats: JPG, JPEG, PNG.

## Response Format

All endpoints return JSON responses with the following structure:

```json
{
  "success": true/false,
  "message": "Description of the result",
  "imageUrl": "Cloudinary URL (for cloud uploads)",
  "fileData": { /* File metadata from DB */ }
}
```

## Email Notifications

Upon successful upload to Cloudinary, an email is sent to the provided email address with the file URL and confirmation message.

## Project Structure

```
fileupload/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── controllers/
│   └── fileUpload.js        # Upload logic and handlers
├── models/
│   └── File.js              # MongoDB schema for files
├── routes/
│   └── FileUpload.js        # API routes
├── index.js                 # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.
