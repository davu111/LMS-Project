const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        total_students: { type: Number, required: true },
        total_teachers: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("School", schoolSchema);
