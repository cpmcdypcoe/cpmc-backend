const mongoose = require('mongoose')
const { MONGO_DATABASE_URL } = require("./envVariable.js");

mongoose.set('strictQuery', true);

const connnectDB = async () => {
    try {
        const con = await mongoose.connect(MONGO_DATABASE_URL, { retryWrites: true, w: 'majority' });
        console.log(`Mongodb connected!!`);
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};

module.exports = connnectDB;