import Teacher from "../../models/teacher.model.js";
import School from "../../models/school.model.js";
import { faker } from "@faker-js/faker";

export const seedTeachers = async () => {
    try {
        // Clear existing teachers
        await Teacher.deleteMany({});
        console.log("🧹 Cleared existing teachers".yellow);

        // Get all schools to assign teachers to
        const schools = await School.find({});

        if (schools.length === 0) {
            throw new Error("Schools not found. Seed schools first.");
        }

        const teachers = [];

        // Create 5-15 teachers per school
        for (const school of schools) {
            const teacherCount = faker.number.int({ min: 5, max: 15 });

            for (let i = 0; i < teacherCount; i++) {
                teachers.push({
                    name: faker.person.fullName(), // Changed from faker.name.fullName()
                    school: school._id,
                });
            }
        }

        await Teacher.insertMany(teachers);
        console.log(`👨‍🏫 Created ${teachers.length} teachers`.green);
        return teachers;
    } catch (error) {
        console.error("❌ Failed to seed teachers:".red, error);
        throw error;
    }
};
