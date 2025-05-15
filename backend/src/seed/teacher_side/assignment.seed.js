import mongoose from "mongoose";
import Assignment from "../../models/assignment.model.js";
import { faker } from "@faker-js/faker";

export const seedAssignments = async () => {
    try {
        // Clear existing data
        await Assignment.deleteMany({});
        console.log("🧹 Cleared existing assignments".yellow);

        // Generate fake assignments
        const assignments = [];

        // Possible tags for assignments
        const possibleTags = [
            "Homework",
            "Project",
            "Exam",
            "Quiz",
            "Essay",
            "Presentation",
            "Research",
            "Lab",
            "Group Work",
            "Individual",
        ];

        // Generate 50-100 assignments
        const assignmentCount = faker.number.int({ min: 50, max: 100 });

        for (let i = 0; i < assignmentCount; i++) {
            // Create assignment
            const tagCount = faker.number.int({ min: 1, max: 3 });
            const assignmentTags = faker.helpers.arrayElements(
                possibleTags,
                tagCount
            );

            const assignment = {
                tags: assignmentTags,
                content: faker.lorem.paragraphs(
                    faker.number.int({ min: 1, max: 5 })
                ),
            };

            assignments.push(assignment);
        }

        // Insert assignments and get their IDs
        const createdAssignments = await Assignment.insertMany(assignments);
        console.log(
            `📝 Created ${createdAssignments.length} assignments`.green
        );

        return createdAssignments;
    } catch (error) {
        console.error("❌ Failed to seed assignments:".red, error);
        throw error;
    }
};
