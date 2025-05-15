import Subject from "../../models/subject.model.js";
import Course from "../../models/course.model.js";
import Teacher from "../../models/teacher.model.js";
import { faker } from "@faker-js/faker";

export const seedSubjects = async () => {
    try {
        // Clear existing subjects
        await Subject.deleteMany({});
        console.log("🧹 Cleared existing subjects".yellow);

        // Get all courses and teachers to assign subjects to
        const courses = await Course.find({});
        const teachers = await Teacher.find({});

        if (courses.length === 0 || teachers.length === 0) {
            throw new Error("Courses or teachers not found. Seed them first.");
        }

        // Common subjects for all grades
        const subjectNames = [
            "Math",
            "Literature",
            "Physics",
            "Chemistry",
            "Biology",
            "History",
            "Geography",
            "English",
            "Physical Education",
            "Civics",
        ];

        const subjects = [];

        for (const course of courses) {
            // Determine grade from course name (e.g., "10A1" -> grade 10)
            const grade = parseInt(course.name.match(/^\d+/)[0]);

            // Determine how many subjects to create (6, 12, or 18)
            let subjectCount;
            const rand = Math.random();
            if (rand < 0.33) {
                subjectCount = 6;
            } else if (rand < 0.66) {
                subjectCount = 12;
            } else {
                subjectCount = 18;
            }

            // Select random teachers for this course's subjects
            const courseTeachers = faker.helpers.arrayElements(
                teachers,
                Math.min(teachers.length, subjectCount / 2)
            );

            // Create subjects for this course
            const subjectsPerGrade = subjectCount / (subjectCount <= 6 ? 1 : 2);
            const gradesToInclude =
                subjectCount <= 6 ? [grade] : [grade, grade + 1];

            for (const subjectGrade of gradesToInclude) {
                const selectedSubjects = faker.helpers.arrayElements(
                    subjectNames,
                    subjectsPerGrade
                );

                for (const subjectName of selectedSubjects) {
                    const teacher = faker.helpers.arrayElement(courseTeachers);
                    const startDate = new Date(course.start_date);

                    // For higher grades, adjust start date by 1 year
                    if (subjectGrade > grade) {
                        startDate.setFullYear(startDate.getFullYear() + 1);
                    }

                    // Calculate end date (1 year from start)
                    const endDate = new Date(startDate);
                    endDate.setFullYear(endDate.getFullYear() + 1);

                    subjects.push({
                        name: `${subjectName} ${subjectGrade}`,
                        exp: course.exp,
                        course: course._id,
                        teacher: teacher._id,
                        color: faker.color.rgb(),
                        start_date: startDate,
                        end_date: endDate,
                    });
                }
            }
        }

        await Subject.insertMany(subjects);
        console.log(`📚 Created ${subjects.length} subjects`.green);
        return subjects;
    } catch (error) {
        console.error("❌ Failed to seed subjects:".red, error);
        throw error;
    }
};
