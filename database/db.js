const mongoose = require('mongoose');

const Connection = async () => {
    const localURL = "mongodb://127.0.0.1:27017/loginAppDB";
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(localURL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected to database succesfully.");
    } catch (error) {
        console.log(error);
    }
}

module.exports = Connection;