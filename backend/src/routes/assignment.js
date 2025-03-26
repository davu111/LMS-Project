const express = require("express");
const router = express.Router();
const assignmentController = require("../app/controllers/AssignmentController");


router.get("/getAssignments", assignmentController.getAssignments);

module.exports = router;
