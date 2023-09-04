
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const router = require('./Routes/Routes.js');
const connection = require('./Database/db.js');



//add body parser and cors to express
const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 8000

app.use(router)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

connection();