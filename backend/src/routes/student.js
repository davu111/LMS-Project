const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/StudentController");

// router.get("/getStudents", studentController.getStudents);
// router.get("/getStudent/:id", studentController.getStudentById);
router.get("/getStudentsByCourse/:course_id", studentController.getStudentsByCourse);

module.exports = router;