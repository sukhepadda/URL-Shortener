const express = require('express');
const {connectToMongoDB} = require('./connection');
const urlRoute = require('./routes/url');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() => console.log("Database Connected"));


app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))