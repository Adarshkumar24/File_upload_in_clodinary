const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

console.log("66666");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide file name"],
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
}, { timestamps: true });


fileSchema.post("save", async function(doc) {
    try {
        console.log("File saved in db", doc);


        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });
        //send mail 
        await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:doc.email,
            subject:"File uploaded successfully",
            text:`Your file ${doc.name} has been uploaded successfully. You can view the file at ${doc.imageUrl}`,
        });
        console.log("Mail sent successfully");
    }
    catch(error) {
        console.log("Error in sending mail", error);
    }
});

console.log("77777");
module.exports = mongoose.model("File", fileSchema);