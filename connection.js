const mongoose = require('mongoose');

async function connectToMongoDB(){
    return mongoose.connect(url);
}

module.exports =  {
    connectToMongoDB,
}