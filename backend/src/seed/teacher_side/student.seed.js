import Student from "../../models/student.model.js";
import Course from "../../models/course.model.js";
import School from "../../models/school.model.js";
import { faker } from "@faker-js/faker";

const VIETNAMESE_NAMES = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
    "Vũ Thị F",
    "Đặng Văn G",
    "Bùi Thị H",
];

const STUDENT_COUNT = 10;
const MIN_AGE = 15;
const MAX_AGE = 18;

export const seedStudents = async () => {
    try {
        await clearExistingStudents();
        const courses = await getCoursesWithSchools();

        const { students, courseStudentCounts } = await generateStudentData(
            courses
        );
        const createdStudents = await Student.insertMany(students);

        await updateCounts(courseStudentCounts);

        console.log(`👨‍🎓 Created ${createdStudents.length} students`.green);
        return createdStudents;
    } catch (error) {
        console.error("❌ Failed to seed students:".red, error);
        throw error;
    }
};

async function clearExistingStudents() {
    await Student.deleteMany({});
    console.log("🧹 Cleared existing students".yellow);
}

async function getCoursesWithSchools() {
    const courses = await Course.find({}).populate("school");
    if (courses.length === 0) {
        throw new Error("No courses found to assign students to");
    }
    return courses;
}

function generateStudentData(courses) {
    const students = [];
    const courseStudentCounts = initializeCourseCounts(courses);

    for (let i = 0; i < STUDENT_COUNT; i++) {
        const randomCourse = faker.helpers.arrayElement(courses);
        const student = createStudent(randomCourse);

        students.push(student);
        courseStudentCounts[randomCourse._id]++;
    }

    return { students, courseStudentCounts };
}

function initializeCourseCounts(courses) {
    return courses.reduce((acc, course) => {
        acc[course._id] = 0;
        return acc;
    }, {});
}

function createStudent(course) {
    const randomName = faker.helpers.arrayElement(VIETNAMESE_NAMES);
    const [lastName, firstName] = randomName.split(" ");

    return {
        name: randomName,
        dob: faker.date
            .birthdate({ min: MIN_AGE, max: MAX_AGE, mode: "age" })
            .toISOString()
            .split("T")[0],
        address: `${faker.location.streetAddress()}, ${faker.location.city()}, Vietnam`,
        phone: faker.phone.number("+84##########"),
        email: faker.internet.email({
            firstName,
            lastName,
            provider: "gmail.com",
        }),
        parents: Array.from({ length: 2 }, () => ({
            name: faker.person.fullName(),
            phone: faker.phone.number("+84##########"),
        })),
        course: course._id,
        school: course.school._id,
    };
}

async function updateCounts(courseStudentCounts) {
    try {
        await updateCourseCounts(courseStudentCounts);
        await updateSchoolCounts(courseStudentCounts);
        console.log("🔢 Updated school and course counts".green);
    } catch (error) {
        console.error("❌ Failed to update counts:".red, error);
        throw error;
    }
}

async function updateCourseCounts(courseStudentCounts) {
    const courseUpdates = Object.entries(courseStudentCounts).map(
        ([courseId, count]) =>
            Course.updateOne({ _id: courseId }, { total_students: count })
    );
    await Promise.all(courseUpdates);
}

async function updateSchoolCounts(courseStudentCounts) {
    const schools = await School.find({});
    const schoolUpdates = schools.map(async (school) => {
        const totalStudents = await calculateSchoolTotalStudents(
            school._id,
            courseStudentCounts
        );
        return School.updateOne(
            { _id: school._id },
            { total_students: totalStudents }
        );
    });
    await Promise.all(schoolUpdates);
}

async function calculateSchoolTotalStudents(schoolId, courseStudentCounts) {
    const coursesInSchool = await Course.find({ school: schoolId });
    return coursesInSchool.reduce(
        (sum, course) => sum + (courseStudentCounts[course._id] || 0),
        0
    );
}
