const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

console.log("8888");

exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from request
        const file = req.files.file;
        console.log("file AAGYEI ->>", file);
        console.log("9999");

        //which path you want to store
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path YHI HHH ->>", path);
        console.log("1000");
        //move file to the given path
        file.mv(path, (err) => {
            console.log(err);

        });
        res.json({
                success: true,
                message: "File uploaded successfully",
                
        });

    }
    catch(error) {
        console.log("NOT ABLE TO UPLOAD FILE:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

function isFileTypeSupported(filetype, supportedFiles) {
    return supportedFiles.includes(filetype);
}

async function uploadToCloudinary(file, folder,quality) {
    const options = {folder};

    if(quality) {
        options.quality = quality;
    }
    console.log("temp file path ->>", file.tempFilePath);
    options.resource_type = "auto";  //yeh line add krni h video k liye
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// image upload ka bhi function bna skte h yha pr
exports.imageUpload = async (req, res) => {
    try {
        //fetch file from request
        const {name,tags, email} = req.body;
        console.log("name, tags, email ->>", name, tags, email);

        const file=req.files.imageFile;
        console.log("file AAGYEI ->>", file);
        

        //validation
        const supportedFiles = ['png', 'jpeg', 'jpg'];
        const filetype = file.name.split('.')[1].toLowerCase();
        console.log("filetype ->>", filetype);


        if(!isFileTypeSupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        //file format supported h to aage badho
        console.log("uploading to codehepl");
        const response = await uploadToCloudinary(file, "codehelp");
        console.log("response from cloudinary ->>", response);

        //db me entry save krne h 
        const fileData = await File.create({
             name,
             tags,
             email,
             imageUrl: response.secure_url,
     });
        res.json({
                success: true,
                message: "Image uploaded successfully",
                imageUrl: response.secure_url,
                fileData,
        });


    }
    catch(error) {
        console.log("NOT ABLE TO UPLOAD IMAGE:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};      


//video upload krna h to vhi kr skte h yha pr
exports.videoUpload = async (req, res) => {
    try {
        //fetch file from request
        const {name,tags, email} = req.body;
        console.log("name, tags, email ->>", name, tags, email);

        const file=req.files.videoFile;
        console.log("file AAGYEI ->>", file);   
        
        
        //validation
        const supportedFiles = ['mp4', 'mov', 'wmv'];
        const filetype = file.name.split('.')[1].toLowerCase();
        console.log("filetype ->>", filetype);


        if(!isFileTypeSupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        //file format supported h to aage badho
        console.log("uploading to codehepl");
        const response = await uploadToCloudinary(file, "codehelp");
        console.log("response from cloudinary ->>", response);

        //db me entry save krne h 
        const fileData = await File.create({
            name,      
            tags,       
            email,      
            imageUrl: response.secure_url,
     });
        res.json({
                success: true,  
                message: "Video uploaded successfully",
                imageUrl: response.secure_url,
                fileData,   
        });

    }
    catch(error) {
        console.log("NOT ABLE TO UPLOAD VIDEOdfd:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


//imagesize reducer
exports.imageSizeReducer = async (req, res) => {
    try {
        //fetch file from request
        const {name,tags, email} = req.body;
        console.log("name, tags, email ->>", name, tags, email);

        const file=req.files.sizereducerFile;
        console.log("file AAGYEI ->>", file);   
        
        
        //validation
        const supportedFiles = ['jpg', 'jpeg', 'png'];
        const filetype = file.name.split('.')[1].toLowerCase();
        console.log("filetype ->>", filetype);


        if(!isFileTypeSupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File type noeeeet supported",
            });
        }

        //file format supported h to aage badho
        console.log("uploading to codehepl");
        const response = await uploadToCloudinary(file, "codehelp",300);
        console.log("response from cloudinary ->>", response);

        //db me entry save krne h 
        const fileData = await File.create({
            name,      
            tags,       
            email,      
            imageUrl: response.secure_url,
     });
        res.json({
                success: true,  
                message: "Image uploaded successfully",
                imageUrl: response.secure_url,
                fileData,   
        });

    }
    catch (error) {
        console.log("Error in reducing image size:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }       
};  
