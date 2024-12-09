const mongoose = require('mongoose');

async function connectMongoDB(url){
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(err));
}

module.exports = {connectMongoDB};


  