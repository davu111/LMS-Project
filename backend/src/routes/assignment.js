const express = require("express");
const router = express.Router();
const assignmentController = require("../app/controllers/AssignmentController");


router.get("/getAssignments", assignmentController.getAssignments);
router.get("/getAssignment/:id", assignmentController.getAssignmentById);
router.post("/createAssignment", assignmentController.createAssignment);
router.put("/updateAssignment/:id", assignmentController.updateAssignment);
router.put("/uploadFile/:id", assignmentController.uploadFile);
router.delete("/deleteAssignment/:id", assignmentController.deleteAssignment);

module.exports = router;
