import Course from "../../models/course.model.js";
import School from "../../models/school.model.js";
import { faker } from "@faker-js/faker";

export const seedCourses = async () => {
    try {
        // Clear existing courses
        await Course.deleteMany({});
        console.log("🧹 Cleared existing courses".yellow);

        // Get all schools to assign courses to
        const schools = await School.find({});

        const courseTemplates = [
            { name: "10A1", exp: "100.000" },
            { name: "10A2", exp: "100.000" },
            { name: "10A3", exp: "100.000" },
            { name: "11A1", exp: "200.000" },
            { name: "11A2", exp: "200.000" },
            { name: "12A1", exp: "300.000" },
            { name: "12A2", exp: "300.000" },
            { name: "12A3", exp: "300.000" },
        ];

        const courses = [];
        for (const school of schools) {
            const schoolCourses = await Course.insertMany(
                courseTemplates.map((template) => ({
                    ...template,
                    school: school._id,
                    total_students: 0,
                    start_date: faker.date.between({
                        from: new Date(2024, 0, 1),
                        to: new Date(2024, 11, 31),
                    }),
                }))
            );
            courses.push(...schoolCourses);
        }

        console.log(`📚 Created ${courses.length} courses`.green);
        return courses;
    } catch (error) {
        console.error("❌ Failed to seed courses:".red, error);
        throw error;
    }
};
