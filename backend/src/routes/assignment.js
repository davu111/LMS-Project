const express = require("express");
const router = express.Router();
const assignmentController = require("../app/controllers/AssignmentController");


router.get("/getAssignments", assignmentController.getAssignments);
router.post("/createAssignment", assignmentController.createAssignment);

module.exports = router;
