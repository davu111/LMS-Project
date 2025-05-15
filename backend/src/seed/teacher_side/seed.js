const mongoose = require("mongoose");
const seedSchools = require("./school.seed");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/school");
    await seedSchools();
    mongoose.disconnect();
}

main();
