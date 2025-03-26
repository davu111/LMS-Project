const mongoose = require("mongoose");

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/school');
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { connect };