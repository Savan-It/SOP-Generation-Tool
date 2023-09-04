const OpenAIApi = require("openai");
const env = require('dotenv').config();
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('nodemailer');
const User = require('../model/user-schema');

const pdfTemplate = require('../Documents/pdfTemplete');

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_APIKEY,
});

//create a post api to get the prompt from the client and send it to openai
exports.chatController = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": `${prompt}` }],
        });
        console.log(response);
        res.send(response.choices[0].message.content);
    } catch (error) {
        console.log("Error :", error.message);
    }
}


//To generate the PDF
exports.createPdf = async (req, res) => {
    console.log(req.body);
    const userName = req.body.userdata.fullName;
    const filepath = path.join(__dirname, `${userName}-statement of purpose.pdf`);
    pdf.create(pdfTemplate(req.body), {}).toFile(filepath, (err) => {
        if (err) {
            res.send(err.message);
        }
        res.send('pdf Generated');
    });
}


//send pdf to mail
exports.sendPdf = async (req, res) => {

    pathToAttachment = path.join(__dirname,`${req.body.fullname}-statement of purpose.pdf`);
    attechment = fs.readFileSync(pathToAttachment).toString("base64");

    let smtpTransport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    smtpTransport.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: `Statement of Purpose for ${req.body.fullname}`,
        html: `
        Dear ${req.body.fullname}<br><br>

        Please find attched the Statement of Purpose template for your student<br>
        visa application to Canada. Kindly edit it as per your scenario and<br>
        needs.<br><br>
        
        In case you would like to get the full statement of purpose drafted by<br>
        our experts, do not hesitate to contact us.<br><br>

        Best Regards,<br>
        Team Effizient<br>
        www.effizient.ca<br>
        Ph: 226-774-9168<br>
        Email: info@effizient.ca<br>
        `,
        attachments: [
            {
                content: attechment,
                filename: `${req.body.fullname}-statement of purpose.pdf}`,
                contentType: "application/pdf",
                path: pathToAttachment,
                disposition: "attachment"
            }
        ]
    },function(error, response){
        if(error){
            console.log(error.message);
            res.send(error.message);
        }else{
            res.send('Mail hase been sended to your email, Check your mail inbox');
        }
    })

}


//insert user data to database
exports.database = async (req, res) => {
    try {
        console.log(req.body);
        const {values} = req.body;
        await  User.insertMany(values);
        console.log(values);
        console.log("User data successfully interted in Database!!");
        res.send("User data successfully interted in Database!!");
    } catch (error) {
        console.log("Error while inserting user data: ", error.message);
    }
}

