const express = require('express');
const { chatController, createPdf, sendPdf, database } = require('../Controller/Controller');
const router = express.Router();

//create a post api to get the prompt from the client and send it to openai
router.post('/chat', chatController);

//To generate the PDF
router.post('/createPdf', createPdf);

//send pdf to mail
router.post('/sendPdf', sendPdf);

//insert user data to database
router.post('/database', database);

module.exports = router;
