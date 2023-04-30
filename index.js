const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnect } = require('./configMongo');

const bodyParse = require("body-parser");

const app = express();
dbConnect();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParse.json());
app.use('/api', require('./Routes/auth'));
app.use('/api', require('./Routes/users'));
app.use('/api', require('./Routes/category'));
app.use('/api', require('./Routes/news'));
app.use('/api', require('./Routes/newsSource'));



app.listen(port, () => console.log("News Cover app listening on port " + port +"!!" ))