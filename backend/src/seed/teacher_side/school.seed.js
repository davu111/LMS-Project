const School = require("../../app/models/school.model");
const faker = require("@faker-js/faker");

// Hàm seed
const seedSchools = async () => {
    try {
        // Xóa dữ liệu cũ
        await School.deleteMany({});
        console.log("🧹 Cleared existing schools");

        // Tạo dữ liệu mới
        const schools = await School.insertMany([
            {
                name: "Greenwood High",
                total_students: 0,
                total_teachers: 30,
            },
            {
                name: "Sunshine Academy",
                total_students: 0,
                total_teachers: 45,
            },
        ]);

        console.log(`🏫 Created ${schools.length} schools`);
        return schools;
    } catch (error) {
        console.error("❌ Failed to seed schools:", error);
        throw error;
    }
};

// Xuất module đúng cách
module.exports = seedSchools;
