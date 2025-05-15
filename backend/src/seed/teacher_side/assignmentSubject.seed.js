import mongoose from "mongoose";
import AssignmentSubject from "../../models/assignmentSubject.model.js";
import Subject from "../../models/subject.model.js";
import Assignment from "../../models/assignment.model.js";
import { faker } from "@faker-js/faker";

export const seedAssignmentSubjects = async (assignments) => {
    try {
        // Clear existing data
        await AssignmentSubject.deleteMany({});
        console.log("🧹 Cleared existing assignment subjects".yellow);

        // Get all subjects to assign assignments to
        const subjects = await Subject.find({});

        if (subjects.length === 0) {
            throw new Error("Subjects not found. Seed them first.");
        }

        // If assignments not provided, get them from database
        if (!assignments || assignments.length === 0) {
            assignments = await Assignment.find({});
            if (assignments.length === 0) {
                throw new Error("Assignments not found. Seed them first.");
            }
        }

        const assignmentSubjects = [];

        // Generate assignment subjects (2-5 per subject)
        for (const subject of subjects) {
            const assignmentSubjectCount = faker.number.int({ min: 2, max: 5 });
            const subjectAssignments = faker.helpers.arrayElements(
                assignments,
                assignmentSubjectCount
            );

            for (const assignment of subjectAssignments) {
                const now = new Date();
                const timeStart = faker.date.between({
                    from: subject.start_date,
                    to: new Date(
                        subject.end_date.getTime() - 30 * 24 * 60 * 60 * 1000
                    ), // 30 days before end date
                });

                // Deadline is 1-4 weeks after timeStart
                const deadline = new Date(timeStart);
                deadline.setDate(
                    deadline.getDate() + faker.number.int({ min: 7, max: 28 })
                );

                const assignmentSubject = {
                    subjects: subject._id,
                    title: `${faker.word.adjective()} ${faker.word.noun()} Assignment`,
                    instructions: faker.lorem.paragraphs(
                        faker.number.int({ min: 1, max: 3 })
                    ),
                    assignment: assignment._id,
                    notes: faker.lorem.sentences(2), // Always provide notes
                    timeStart: timeStart,
                    deadline: deadline,
                };

                assignmentSubjects.push(assignmentSubject);
            }
        }

        const createdAssignmentSubjects = await AssignmentSubject.insertMany(
            assignmentSubjects
        );
        console.log(
            `📚 Created ${createdAssignmentSubjects.length} assignment subjects`
                .green
        );

        return createdAssignmentSubjects;
    } catch (error) {
        console.error("❌ Failed to seed assignment subjects:".red, error);
        throw error;
    }
};
